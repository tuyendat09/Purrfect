const Element = require("../models/Element");
const ElementLike = require("../models/ElementLike");
const { getEmbedCLIP } = require("../utils/getEmbedCLIP");
const redis = require("../redisClient");
const { getCacheKey, getOrSetCache } = require("../utils/redisCache");
const { uploadFileToDrive } = require("../utils/uploadToDrive");
const Cluster = require("../models/Cluster");

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

  const {
    success: processEmbeddingResult,
    tags,
    embedding,
    colors,
    code,
  } = await processEmbedding(file);

  if (!processEmbeddingResult) return { success: processEmbeddingResult, code };

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
  const query = Element.find(filter).sort(sort).skip(skip).limit(limit);

  if (!filter._id || (typeof filter._id === "object" && filter._id.$ne)) {
    query.select("-embedding -autoTags -imageUrl -uploadBy");
  }

  return await query;
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

    return { success: true, code: "UNLIKED_ELEMENT" };
  } else {
    await handleCreateLikeElement(likeElementData);
    await clearUserElementCache(likeElementData.userId);

    return { success: true, code: "LIKED_ELEMENT" };
  }
};

function prepareClusterElementQuery(cluster, { page = 1, limit = 25 }) {
  const skip = (page - 1) * limit;

  return {
    elementIds: cluster.elementIds,
    skip,
    limit,
    currentPage: page,
  };
}

async function queryClusterElementsPage(elementIds, { skip, limit }) {
  const pageElementIds = elementIds.slice(skip, skip + limit);

  const elements = await Element.find({ _id: { $in: pageElementIds } })
    .sort({ createdAt: -1 })
    .select("-embedding -autoTags -imageUrl -uploadBy")
    .lean();

  return { elements, pageElementIds };  
}

async function queryUserLikes(userId, elementIds) {
  const likedDocs = await ElementLike.find({
    userId: userId,
    elementId: { $in: elementIds },
  })
    .select("elementId")
    .lean();

  return new Set(likedDocs.map((d) => d.elementId.toString()));
}

function mapElementsWithLike(elements, likedIds) {
  return elements.map((e) => ({
    ...e,
    isLiked: likedIds.has(e._id.toString()),
  }));
}

async function fetchClusterElementsFromDB(clusterName, userId, page, limit) {
  const cluster = await Cluster.findOne({ clusterName: clusterName })
    .select("elementIds")
    .lean();

  if (!cluster) throw new Error("Cluster not found");

  const total = cluster.elementIds.length;
  const { elementIds, skip, currentPage } = prepareClusterElementQuery(
    cluster,
    { page, limit }
  );

  const { elements, pageElementIds } = await queryClusterElementsPage(
    elementIds,
    { skip, limit }
  );

  const likedIds = await queryUserLikes(userId, pageElementIds);

  const elementsWithLike = mapElementsWithLike(elements, likedIds);

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

exports.handleQueryClusterElements = async ({
  clusterName,
  userId,
  page = 1,
  limit = 25,
}) => {
  console.log(clusterName);
  return await fetchClusterElementsFromDB(clusterName, userId, page, limit);
};

// router.get("/user/:userId/followed-elements", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // 1. Lấy danh sách clusterId (albumId) mà user follow
//     const followedClusters = await AlbumFollow.find({ userId }).select("albumId");
//     const clusterIds = followedClusters.map(f => f.albumId);

//     if (clusterIds.length === 0) {
//       return res.json([]); // Trả về mảng rỗng nếu user không follow cluster nào
//     }

//     // 2. Lấy tất cả elementIds từ những cluster đó
//     const clusters = await Clusters.find({ _id: { $in: clusterIds } }).select("elementIds");
//     const allElementIds = clusters.flatMap(c => c.elementIds);

//     if (allElementIds.length === 0) {
//       return res.json([]);
//     }

//     // 3. Lấy tất cả Element từ những elementIds đó
//     const elements = await Element.find({ _id: { $in: allElementIds } });

//     res.json(elements);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
