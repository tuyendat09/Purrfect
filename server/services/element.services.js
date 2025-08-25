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
  console.log(tags);
  const { originalUrl, previewUrl } = await handleUpload(file);

  const newElementData = { originalUrl, previewUrl, userId, embedding, tags };

  await saveElement(newElementData);

  return { success: true };
};

function prepareQuery(params = {}) {
  const { tag, lastest, oldest, popular, id, exceptId } = params;
  const filter = {};
  const sort = {};

  if (tag) {
    const jsonParseTags = JSON.parse(tag);
    filter.autoTags = { $in: jsonParseTags };
  }

  if (id) {
    filter._id = id;
  }

  if (exceptId) {
    filter._id = { ...filter._id, $ne: exceptId };
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

  // Không dùng cache nếu có query.id
  const useCache = currentPage <= 10 && !query.id;
  const cacheKey =
    getCacheKey(filter, sort, currentPage, limit) + `:user:${userId}`;

  if (useCache) {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("📌 Data from cache");
      return JSON.parse(cachedData);
    }
  }

  // Lấy dữ liệu từ DB
  const [elements, total, likedDocs] = await Promise.all([
    queryElement({ filter, sort, skip, limit }),
    Element.countDocuments(filter),
    ElementLike.find({ userId }).select("elementId"),
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

  // Lưu cache chỉ nếu dùng
  if (useCache) {
    await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
    console.log("📌 Data cached in Redis");
  }

  return result;
};

async function handleCheckDuplicated({ userId, elementId }) {
  return await ElementLike.findOne({ userId, elementId });
}

async function handleDeleteLikeElement({ userId, elementId }) {
  return await ElementLike.findOneAndDelete({ userId, elementId });
}

async function handleCreateLikeElement({ userId, elementId }) {
  const like = new ElementLike({ userId, elementId });
  return await like.save();
}

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
