const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const checkRole = require("../middleware/checkRole");
const passport = require("passport");

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.post("/verifyOTP", authController.handleVerifyOTP);
router.post("/test", authController.testToken);

// router.get("/test", checkRole(["admin", "user"]), authController.test);

module.exports = router;
