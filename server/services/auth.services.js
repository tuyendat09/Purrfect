const bcrypt = require("bcrypt");
const User = require("../models/User");
const TempUser = require("../models/TempUser");
const { sendOtpEmail, generateOTP } = require("../utils/sendOTP");
const { isValidEmail, isValidPassword } = require("../utils/verifyResigerData");
const isDocumentExist = require("../utils/isDocumentExist");
const tokenService = require("./tokenServices");

exports.isUserExist = (email) => {
  return isDocumentExist(User, { email: email });
};

exports.isTempUserExist = (email) => {
  return isDocumentExist(TempUser, { email: email });
};

exports.createTempUser = async (newUserData, otp) => {
  const { email, password } = newUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const tempUser = new TempUser({
    email: email,
    password: hashedPassword,
    otp,
  });

  await tempUser.save();
  sendOtpEmail(email, otp);
};

exports.updateTempUser = async (existingTempUser, newUserData, otp) => {
  const { password } = newUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  existingTempUser.password = hashedPassword;
  existingTempUser.otp = otp;
  existingTempUser.createdAt = new Date();

  await existingTempUser.save();
  sendOtpEmail(existingTempUser.email, otp);
};

exports.createOrUpdateTempUser = async (newUserData, otp) => {
  const existingTempUser = await TempUser.findOne({ email: newUserData.email });

  if (existingTempUser) {
    return this.updateTempUser(existingTempUser, newUserData, otp);
  } else {
    return this.createTempUser(newUserData, otp);
  }
};

exports.handleRegister = async (newUserData) => {
  const { email, password } = newUserData;
  if (!isValidEmail(email)) return { success: false, code: "INVALID_EMAIL" };
  if (!isValidPassword(password))
    return { success: false, code: "INVALID_PASSWORD" };

  const userExists = await this.isUserExist(email);

  if (userExists) {
    return { success: false, code: "USER_EXIST" };
  }

  const OTP = await generateOTP();
  await this.createOrUpdateTempUser(newUserData, OTP);

  return { success: true, code: "REGISTER_COMPLETE" };
};

function isOTPValid(tempUser, otp) {
  if (!tempUser) return false;
  return String(tempUser.otp) === String(otp);
}

async function createUserFromTemp(tempUser) {
  const { email, password } = tempUser;

  const newUser = new User({
    email,
    password,
  });

  await newUser.save();
  return newUser;
}

async function deleteTempUser(email) {
  await TempUser.deleteOne({ email: email });
}

exports.handleVerifyOTP = async (verifyData) => {
  const { email, OTP } = verifyData;
  const tempUser = await TempUser.findOne({ email });

  if (!tempUser) {
    return { success: false, code: "TEMP_USER_EXPIRED" };
  }

  if (!isOTPValid(tempUser, OTP)) {
    return { success: false, code: "INVALID_OTP" };
  }

  const newUser = await createUserFromTemp(tempUser);
  await deleteTempUser(email);

  return { success: true, user: newUser };
};

exports.handleVerifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.handleLogin = async (loginData, req) => {
  const { email, password } = loginData;

  const user = await this.getUserByEmail(email);

  if (!user) {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }

  const isMatch = await this.handleVerifyPassword(password, user.password);

  if (!isMatch) {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }

  // TODO: generate token, return success
  const token = await tokenService.generateToken(user);
  req.session.token = token;

  const publicUser = {
    id: user._id,
    email: user.email,
    displayName: user.displayName,
    profilePicture: user.profilePicture,
  };

  return {
    success: true,
    user: publicUser,
  };
};
