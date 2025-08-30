const Cluster = require("../models/Cluster");
const isDocumentExist = require("../utils/isDocumentExist");
const { getCacheKey } = require("../utils/redisCache");
const verifyEmptyData = require("../utils/verifyEmptyData");
const redis = require("../redisClient");

const isClusterExist = (clusterName) => {
  return isDocumentExist(Cluster, { clusterName: clusterName });
};

const checkDuplicatedCluster = async (clusterName) => {
  if (await isClusterExist(clusterName)) {
    return { success: false, code: "CLUSTER_EXIST" };
  }
  return { success: true };
};

const createNewCluster = async ({ clusterName, userId }) => {
  const cluster = new Cluster({
    clusterName: clusterName,
    createdBy: userId,
  });

  await cluster.save();
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
  const { name, byUserId, id, exceptId, userFullname } = params;
  console.log(userId);
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

async function getCachedClusters(cacheKey) {
  const cachedData = await redis.get(cacheKey);
  return cachedData ? JSON.parse(cachedData) : null;
}

async function setCachedClusters(cacheKey, data) {
  await redis.set(cacheKey, JSON.stringify(data), "EX", 300);
}

function buildClusterResult({ clusters, total, skip, limit, currentPage }) {
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
  const { filter, sort } = prepareQuery(query, userId);
  const { skip, limit, currentPage } = handlePaginateCluster(query);

  const useCache = currentPage <= 10 && !query.id;
  const cacheKey =
    getCacheKey(filter, sort, currentPage, limit) + `:user:${userId}`;

  if (useCache) {
    const cached = await getCachedClusters(cacheKey);
    if (cached) {
      console.log("📌 Clusters from cache");
      return cached;
    }
  }

  const { clusters, total } = await getClustersFromDB({
    filter,
    sort,
    skip,
    limit,
  });

  const result = buildClusterResult({
    clusters,
    total,
    skip,
    limit,
    currentPage,
  });

  if (useCache) {
    await setCachedClusters(cacheKey, result);
    console.log("📌 Clusters cached in Redis");
  }

  return result;
};
