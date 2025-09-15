const express = require("express");
const router = express.Router();
const clusterController = require("../controller/cluster.controller");

router.post("/create", clusterController.handleCreateCluster);
router.get("/", clusterController.handleQueryCluster);
router.post("/add-to-cluster", clusterController.handleAddToCluster);

module.exports = router;
