const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const checkRole = require("../middleware/checkRole");

// GET METHOD
router.get("/", checkRole(["user"]), authController.handleGetUser);
router.get(
  "/by-username",
  checkRole(["user"]),
  authController.handleGetUserByUsername
);

// POST METHOD
router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.post("/verifyOTP", authController.handleVerifyOTP);
router.post("/logout", authController.handleLogout);
router.post("/refresh-token", authController.handleRefreshToken);

// PUT METHOD
router.put(
  "/changeUserName",
  checkRole(["user"]),
  authController.handleEditUserName
);

module.exports = router;
