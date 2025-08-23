const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const elementController = require("../controller/element.controller");

router.post(
  "/upload",
  upload.single("image"),
  elementController.handleCreateNewElement
);

router.get("/", elementController.handleQueryElement);
router.post("/like", elementController.handleLikeElement);

module.exports = router;
