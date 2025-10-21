const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const multer = require("multer");
const upload = multer();

// PUT METHOD
router.put("/changeUserName", userController.handleEditUserName);
router.put("/profile-setting", userController.handleEditUserData);

router.post(
  "/change-profile-picture",
  upload.single("image"),
  userController.handleChangePictureProfile
);

module.exports = router;
