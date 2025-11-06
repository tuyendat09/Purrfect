const clusterServices = require("../services/cluster.services");
const asyncHandler = require("../middleware/asyncHandler");
const reponseUtils = require("../utils/reponse.utils");
const clusterMessages = require("../constants/cluster.message");

exports.handleCreateCluster = asyncHandler(async (req, res) => {
  const { clusterName } = req.body;
  const userId = req.user.id;

  const newClusterData = { clusterName, userId };

  const { success, code } = await clusterServices.handleCreateCluster(
    newClusterData
  );

  if (!success) {
    return reponseUtils.sendErrorResponse(res, code, clusterMessages);
  }

  return reponseUtils.sendSuccessResponse(res, "CREATED", clusterMessages);
});

exports.handleQueryCluster = asyncHandler(async (req, res) => {
  const query = req.query;
  const userId = req.user.id;

  const queryData = { query, userId };
  const result = await clusterServices.handleQueryCluster(queryData);

  return res.status(200).json({ success: true, result });
});

exports.handleAddOrDeleteElementToCluster = asyncHandler(async (req, res) => {
  const { elementId, clusterId } = req.body;
  const id = req.user.id;

  const addToClusterData = {
    elementId,
    clusterId,
    userId: id,
  };

  const { success, code } =
    await clusterServices.handleAddOrDeleteElementToCluster(addToClusterData);

  if (!success) {
    return reponseUtils.sendErrorResponse(res, code, clusterMessages);
  }

  return reponseUtils.sendSuccessResponse(res, code, clusterMessages);
});
