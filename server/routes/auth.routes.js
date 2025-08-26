const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const checkRole = require("../middleware/checkRole");
const passport = require("passport");

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.post("/verifyOTP", authController.handleVerifyOTP);
router.post("/logout", authController.handleLogout);
router.post("/refresh-token", authController.handleRefreshToken);
router.get("/", checkRole(["user"]), authController.handleGetUser);

module.exports = router;
