const asyncHandler = require("../middleware/asyncHandler");
const authServices = require("../services/auth.services");

exports.handleRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const newUserData = {
    email,
    password: String(password),
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

  const { success, code } = await authServices.handleVerifyOTP(verifyData);

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "TEMP_USER_NOT_FOUND":
        message =
          "Your session has expired. Please start the registration again.";
        break;
      case "INVALID_OTP":
        message = "Invalid OTP.";
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
    }
    return res.status(400).json({ success: false, message });
  }
  return res.status(200).json({
    success: true,
    user,
  });
});

exports.testToken = async (req, res) => {
  console.log(req.session);
  console.log(req.session.id);

  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }

  return res.status(200).json(req.session);
};

// A new verification code has been sent to your email
