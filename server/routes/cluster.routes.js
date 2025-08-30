const express = require("express");
const router = express.Router();
const clusterController = require("../controller/cluster.controller");
const checkRole = require("../middleware/checkRole");


router.post("/create", clusterController.handleCreateCluster);
router.get("/",clusterController.handleQueryCluster)

module.exports = router;
