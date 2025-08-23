const Element = require("../models/Element");
const ElementLike = require("../models/ElementLike");
const { getEmbedCLIP } = require("../utils/getEmbedCLIP");
const { uploadFileToS3 } = require("../utils/uploadToAWS");
const redis = require("../redisClient");

async function processEmbedding(file) {
  return await getEmbedCLIP(file);
}

async function handleUpload(file) {
  return await uploadFileToS3(file);
}

async function saveElement({
  originalUrl,
  previewUrl,
  userId,
  embedding,
  tags,
}) {
  const element = new Element({
    imageUrl: originalUrl,
    previewImageUrl: previewUrl,
    uploadBy: userId,
    autoTags: tags,
    embedding: embedding.map((num) => num.toString()),
  });
  await element.save();
}

exports.handleCreateNewElement = async (uploadData) => {
  const { file, user } = uploadData;
  const userId = user.id;

  const { embedding, tags } = await processEmbedding(file);
  const { originalUrl, previewUrl } = await handleUpload(file);

  const newElementData = { originalUrl, previewUrl, userId, embedding, tags };

  await saveElement(newElementData);

  return { success: true };
};

function prepareQuery(params = {}) {
  const { tag, lastest, oldest, popular } = params;

  const filter = {};
  const sort = {};

  if (tag) {
    filter.tag = new RegExp(tag, "i");
  }

  if (lastest) {
    sort._id = -1; // mới nhất
  } else if (oldest) {
    sort._id = 1; // cũ nhất
  } else if (popular) {
    sort.likes = -1; // nhiều like nhất
  }

  return { filter, sort };
}

function handlePaginateElement(params = {}) {
  const { page = 1, limit = 25 } = params;

  const skip = (page - 1) * limit;

  return { skip, limit, currentPage: page };
}

async function queryElement({ filter, sort, skip, limit }) {
  return await Element.find(filter).sort(sort).skip(skip).limit(limit);
}

function getCacheKey(filter, sort, page, limit) {
  const keyObj = { filter, sort, page, limit };
  return `elements:${JSON.stringify(keyObj)}`;
}

async function clearUserElementCache(userId) {
  const stream = redis.scanStream({
    match: `elements:*:user:${userId}`,
  });
  stream.on("data", (keys) => {
    if (keys.length) {
      redis.del(...keys);
    }
  });
}

exports.handleQueryElement = async (queryData) => {
  const { query, userId } = queryData;

  const { filter, sort } = prepareQuery(query);
  const { skip, limit, currentPage } = handlePaginateElement(query);

  const useCache = currentPage <= 10;
  const cacheKey =
    getCacheKey(filter, sort, currentPage, limit) + `:user:${userId}`;

  if (useCache) {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("📌 Data from cache");
      return JSON.parse(cachedData);
    }
  }

  const [elements, total, likedDocs] = await Promise.all([
    queryElement({ filter, sort, skip, limit }),
    Element.countDocuments(filter),
    ElementLike.find({ userId: userId }).select("elementId"),
  ]);

  const likedIds = new Set(likedDocs.map((d) => d.elementId.toString()));
  const elementsWithLike = elements.map((e) => ({
    ...e.toObject(),
    isLiked: likedIds.has(e._id.toString()),
  }));

  const hasNextPage = skip + elements.length < total;
  const nextPage = hasNextPage ? currentPage + 1 : null;

  const result = {
    success: true,
    elements: elementsWithLike,
    total,
    currentPage,
    nextPage,
    hasNextPage,
  };

  // 4️⃣ Lưu cache
  if (useCache) {
    await redis.set(cacheKey, JSON.stringify(result), "EX", 300); // TTL 5 phút
    console.log("📌 Data cached in Redis");
  }

  return result;
};

// --- 1. Check xem user đã like chưa ---
async function handleCheckDuplicated({ userId, elementId }) {
  return await ElementLike.findOne({ userId, elementId });
}

// --- 2. Xoá like ---
async function handleDeleteLikeElement({ userId, elementId }) {
  return await ElementLike.findOneAndDelete({ userId, elementId });
}

// --- 3. Tạo like ---
async function handleCreateLikeElement({ userId, elementId }) {
  const like = new ElementLike({ userId, elementId });
  return await like.save();
}

// --- 4. Toggle like/unlike ---
exports.handleLikeElement = async (likeElementData) => {
  const duplicated = await handleCheckDuplicated(likeElementData);

  if (duplicated) {
    await handleDeleteLikeElement(likeElementData);
    await clearUserElementCache(likeElementData.userId);

    return { success: true, code: "LIKED_ELEMENT" };
  } else {
    await handleCreateLikeElement(likeElementData);
    await clearUserElementCache(likeElementData.userId);

    return { success: true, code: "UNLIKED_ELEMENT" };
  }
};
