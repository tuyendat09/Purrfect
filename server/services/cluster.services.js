const Cluster = require("../models/Cluster");
const isDocumentExist = require("../utils/isDocumentExist");
const { getCacheKey, getOrSetCache } = require("../utils/redisCache");
const verifyEmptyData = require("../utils/verifyEmptyData");
const redis = require("../redisClient");
const User = require("../models/User");
const isClusterExist = (clusterName) => {
  return isDocumentExist(Cluster, { clusterName: clusterName });
};

const checkDuplicatedCluster = async (clusterName) => {
  if (await isClusterExist(clusterName)) {
    return { success: false, code: "CLUSTER_EXIST" };
  }
  return { success: true };
};

const revalidateClusterCache = async (userId) => {
  const cacheKey = `user:${userId}`;

  const fields = await redis.hkeys(cacheKey);

  // Chỉ chọn những field bắt đầu bằng "clusters:"
  const clusterFields = fields.filter((f) => f.startsWith("clusters:"));

  if (clusterFields.length > 0) {
    await redis.hdel(cacheKey, ...clusterFields);
    console.log(
      `🗑️ Deleted ${clusterFields.length} cluster cache fields for ${cacheKey}`
    );
  } else {
    console.log(`ℹ️ No cluster cache fields found for ${cacheKey}`);
  }
};

const createNewCluster = async ({ clusterName, userId }) => {
  const user = await User.findById(userId);
  const cluster = new Cluster({
    clusterName: clusterName,
    createdBy: {
      userId: user.id,
      userPicture: user.profilePicture,
      username: user.username,
    },
  });

  await cluster.save();
  await revalidateClusterCache(userId);
};

exports.handleCreateCluster = async (newClusterData) => {
  const { clusterName } = newClusterData;

  const clusterDuplicated = await checkDuplicatedCluster(clusterName);
  const verifyClusterData = verifyEmptyData(newClusterData);

  if (!clusterDuplicated.success) return clusterDuplicated;
  if (!verifyClusterData.success) return verifyClusterData;

  await createNewCluster(newClusterData);

  return { success: true };
};

function prepareQuery(params = {}, userId) {
  const { elementId, name, byUserId, id, exceptId, userFullname } = params;
  const filter = {};
  const sort = { createdAt: -1 }; // mặc định sắp xếp mới nhất

  if (name) {
    // tìm clusterName chứa keyword
    filter.clusterName = { $regex: name, $options: "i" };
  }

  if (id) {
    filter._id = id;
  }

  if (exceptId) {
    filter._id = { ...filter._id, $ne: exceptId };
  }

  if (byUserId) {
    filter["createdBy.userId"] = userId;
  }

  if (elementId) {
    filter.elementIds = elementId;
  }

  if (userFullname) {
    filter["createdBy.userFullname"] = username;
  }

  return { filter, sort };
}

function handlePaginateCluster(params = {}) {
  const { page = 1, limit = 25 } = params;

  const skip = (page - 1) * limit;

  return { skip, limit, currentPage: page };
}

async function getClustersFromDB({ filter, sort, skip, limit }) {
  const clusters = await Cluster.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const total = await Cluster.countDocuments(filter);
  return { clusters, total };
}

function buildClusterResult({ clusters, total, skip, currentPage }) {
  const hasNextPage = skip + clusters.length < total;
  const nextPage = hasNextPage ? currentPage + 1 : null;

  return {
    clusters,
    total,
    currentPage,
    nextPage,
    hasNextPage,
  };
}

exports.handleQueryCluster = async ({ query, userId }) => {
  console.log("call");

  const { filter, sort } = prepareQuery(query, userId);
  const { skip, limit, currentPage } = handlePaginateCluster(query);

  const useCache = currentPage <= 10 && !query.id;
  const cacheField = `clusters:${getCacheKey(
    filter,
    sort,
    currentPage,
    limit
  )}`;

  if (useCache) {
    // Cache-aside pattern
    return await getOrSetCache(userId, cacheField, async () => {
      const { clusters, total } = await getClustersFromDB({
        filter,
        sort,
        skip,
        limit,
      });

      return buildClusterResult({
        clusters,
        total,
        skip,
        limit,
        currentPage,
      });
    });
  }

  // Nếu không cache → lấy trực tiếp từ DB
  const { clusters, total } = await getClustersFromDB({
    filter,
    sort,
    skip,
    limit,
  });

  return buildClusterResult({
    clusters,
    total,
    skip,
    limit,
    currentPage,
  });
};
