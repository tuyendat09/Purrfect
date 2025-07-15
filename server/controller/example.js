// services/authService.js

const isValidEmail = require("../utils/validateEmail");
const User = require("../models/User");

const register = async ({ email, username, password }) => {
  if (!isValidEmail(email)) return { ok: false, code: "INVALID_EMAIL" };

  const existingUser = await User.findOne({ email });
  if (existingUser) return { ok: false, code: "EMAIL_EXISTS" };

  if (!/^[a-zA-Z0-9]+$/.test(password)) {
    return { ok: false, code: "PASSWORD_INVALID" };
  }

  return { ok: true };
};

module.exports = { register };

// controllers/authController.js

const asyncHandler = require("express-async-handler");
const authService = require("../services/authService");

exports.handleRegister = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const result = await authService.register({ email, username, password });

  if (!result.ok) {
    let message = "Có lỗi xảy ra.";
    switch (result.code) {
      case "INVALID_EMAIL":
        message = "Email không hợp lệ.";
        break;
      case "EMAIL_EXISTS":
        message = "Email đã tồn tại.";
        break;
      case "PASSWORD_INVALID":
        message = "Mật khẩu không được chứa ký tự đặc biệt.";
        break;
    }
    return res.status(400).json({ success: false, message });
  }

  res.status(201).json({ success: true, message: "Đăng ký thành công." });
});
