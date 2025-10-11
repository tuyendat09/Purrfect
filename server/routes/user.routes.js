const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const multer = require("multer");
const upload = multer();

router.get("/upload", (req, res) => {
  res.send(`
    <h2>Upload File</h2>
    <form method="POST" action="/api/user/change-profile-picture" enctype="multipart/form-data">
      <input type="file" name="image" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// PUT METHOD
router.put("/changeUserName", userController.handleEditUserName);

router.post(
  "/change-profile-picture",
  upload.single("image"),
  userController.handleChangePictureProfile
);

module.exports = router;
