const clusterServices = require("../services/cluster.services");
const asyncHandler = require("../middleware/asyncHandler");

exports.handleCreateCluster = asyncHandler(async (req, res) => {
  const { clusterName } = req.body;
  const userId = req.user.id;

  const newClusterData = { clusterName, userId };

  const { success, code } = await clusterServices.handleCreateCluster(
    newClusterData
  );

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "CLUSTER_EXIST":
        message = "You've already created this one! Maybe pick a new name.";
        break;
      case "EMPTY_DATA":
        message = "Looks like you missed a spot — album name can’t be empty!";
        break;
    }
    return res.status(400).json({ success: false, message });
  }

  return res.status(200).json({
    success: true,
    message: "Boom! Album created. Time to fill it with awesome pics!",
  });
});

exports.handleQueryCluster = asyncHandler(async (req, res) => {
  const query = req.query;
  const userId = req.user.id;

  const queryData = { query, userId };
  const result = await clusterServices.handleQueryCluster(queryData);

  return res.status(200).json({ success: true, result });
});

exports.handleAddToCluster = asyncHandler(async (req, res) => {
  const { elementId, clusterId } = req.body;
  const id = req.user.id;

  const addToClusterData = {
    elementId,
    clusterId,
    userId: id,
  };

  const { success, code } = await clusterServices.handleAddElementToCluster(
    addToClusterData
  );

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "ELEMENT_EXIST":
        message = "Looks like this element in there.";
        break;
      case "CLUSTER_NOT_EXIST":
        message = "Looks like this cluster not exist!";
        break;
    }
    return res.status(400).json({ success: false, message });
  }
  return res
    .status(200)
    .json({ success: true, message: "Boom! element added." });
});
