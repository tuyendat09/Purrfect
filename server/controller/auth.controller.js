const asyncHandler = require("../middleware/asyncHandler");
const authServices = require("../services/auth.services");

exports.handleRegister = asyncHandler(async (req, res) => {
  const { email, password, userFullname } = req.body;
  const newUserData = {
    email,
    password: String(password),
    userFullname,
  };

  const { success, code } = await authServices.handleRegister(newUserData);

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "INVALID_EMAIL":
        message = "Oops! That email doesn't look right.";
        break;
      case "USER_EXIST":
        message = "Looks like you already have an account.";
        break;
      case "INVALID_PASSWORD":
        message = "Oops! That password doesn't look right.";
        break;
    }
    return res.status(400).json({ success: false, message });
  }

  return res.status(200).json({
    success: true,
    message: "We’ve sent a verification code to your email",
  });
});

exports.handleVerifyOTP = asyncHandler(async (req, res) => {
  const { email, OTP } = req.body;
  const verifyData = { email, OTP };

  const { success, code } = await authServices.handleVerifyOTP(verifyData, req);

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "TEMP_USER_NOT_FOUND":
        message =
          "Your session has expired. Please start the registration again.";
        break;

      case "INVALID_OTP":
        message =
          "Hmm, that OTP doesn’t seem right. Mind giving it another try?";
        break;
    }
    return res.status(400).json({ success: false, message });
  }

  return res.status(200).json({ success: true, message: "You're all set" });
});

exports.handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const loginData = {
    email,
    password: String(password),
  };

  const { success, code, user } = await authServices.handleLogin(
    loginData,
    req
  );

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "INVALID_CREDENTIALS":
        message =
          "Hmm, we couldn’t log you in. Please double-check your email and password.";
        break;
      case "EMPTY_DATA":
        message =
          "Almost there! Just fill in the missing bits and you're good to go. 😊";
        break;
    }
    return res.status(400).json({ success: false, message });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.session;
  const { success, code } = await authServices.handleRefreshToken(
    refreshToken,
    req
  );

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "NO_TOKEN":
        message =
          "Oops! Looks like you’re not logged in. Mind signing in first?";
        break;
      case "INVALID_TOKEN":
        message = "Oops! Your session seems a bit off. Please log in again";
        break;
      case "USER_NOT_FOUND":
        message =
          "Whoops! We can’t locate your profile. Time for a fresh login.";
        break;
    }
    return res.status(401).json({ success: false, message });
  }
  return res.status(200).json({ success: true });
});

exports.handleLogout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({ success: true });
  });
});

exports.handleGetUser = async (req, res) => {
  const userId = req.user.id;
  const user = await authServices.handleGetUser(userId);

  return res.status(200).json(user);
};

exports.handleEditUserName = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const userId = req.user.id;

  const { success, code } = await authServices.handleChangeUserName(
    userId,
    username
  );

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "USER_NOTFOUND":
        message =
          "Oops! Looks like you’re not logged in. Mind signing in first?";
        break;
      case "USERNAME_EXIST":
        message = "Oops! That username is already taken. Try another one";
        break;
    }
    return res.status(400).json({ success: false, message });
  }
  return res
    .status(200)
    .json({ success: true, message: "Nice! Your username has been set. 🎉" });
});
