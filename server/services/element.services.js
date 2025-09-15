const Element = require("../models/Element");
const ElementLike = require("../models/ElementLike");
const { getEmbedCLIP } = require("../utils/getEmbedCLIP");
const redis = require("../redisClient");
const { getCacheKey, getOrSetCache } = require("../utils/redisCache");
const { uploadFileToDrive } = require("../utils/uploadToDrive");

async function processEmbedding(file) {
  return await getEmbedCLIP(file);
}

async function handleUpload(file) {
  return await uploadFileToDrive(file);
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
  clearUserElementCache(userId);
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

const clearUserElementCache = async (userId) => {
  const cacheKey = `user:${userId}`;

  const fields = await redis.hkeys(cacheKey);

  const clusterFields = fields.filter((f) => f.startsWith("elements:"));

  if (clusterFields.length > 0) {
    await redis.hdel(cacheKey, ...clusterFields);
    console.log(
      `🗑️ Deleted ${clusterFields.length} cluster cache fields for ${cacheKey}`
    );
  } else {
    console.log(`ℹ️ No cluster cache fields found for ${cacheKey}`);
  }
};

exports.handleQueryElement = async (queryData) => {
  const { query, userId } = queryData;
  const { filter, sort } = prepareQuery(query);
  const { skip, limit, currentPage } = handlePaginateElement(query);

  const useCache = currentPage <= 10 && !query.id;

  const cacheField = `elements:${getCacheKey(
    filter,
    sort,
    currentPage,
    limit
  )}`;

  if (useCache) {
    return await getOrSetCache(userId, cacheField, async () => {
      return await fetchElementsFromDB(
        filter,
        sort,
        skip,
        limit,
        userId,
        currentPage
      );
    });
  }

  return await fetchElementsFromDB(
    filter,
    sort,
    skip,
    limit,
    userId,
    currentPage
  );
};

async function fetchElementsFromDB(
  filter,
  sort,
  skip,
  limit,
  userId,
  currentPage
) {
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

  return {
    success: true,
    elements: elementsWithLike,
    total,
    currentPage,
    nextPage,
    hasNextPage,
  };
}

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
