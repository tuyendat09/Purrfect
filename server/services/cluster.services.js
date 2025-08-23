const Cluster = require("../models/Cluster");
const isDocumentExist = require("../utils/isDocumentExist");
const verifyEmptyData = require("../utils/verifyEmptyData");

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
