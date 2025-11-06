// === MODEL ===
const User = require("../models/User");
const TempUser = require("../models/TempUser");

// === UTILS ===
const verifyUtils = require("../utils/verify.utils");
const jwtUtils = require("../utils/jwt.utils");
const userUtils = require("../utils/user.utils");

const isDocumentExist = require("../utils/isDocumentExist");
const { getOrSetCache } = require("../utils/redisCache");
const { sendOtpEmail, generateOTP } = require("../utils/sendOTP");
const bcrypt = require("bcrypt");

const isUserExist = (email) => {
  return isDocumentExist(User, { email: email });
};

const isTempUserExist = (email) => {
  return isDocumentExist(TempUser, { email: email });
};

const createTempUser = async (newUserData, otp) => {
  const { email, password, userFullname } = newUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const tempUser = new TempUser({
    email: email,
    password: hashedPassword,
    otp,
    userFullname,
  });

  await tempUser.save();
};

const updateTempUser = async (existingTempUser, newUserData, otp) => {
  const { password } = newUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  existingTempUser.password = hashedPassword;
  existingTempUser.otp = otp;
  existingTempUser.createdAt = new Date();

  await existingTempUser.save();
};

const createOrUpdateTempUser = async (newUserData, otp) => {
  const existingTempUser = await isTempUserExist(newUserData.email);

  if (existingTempUser) {
    return updateTempUser(existingTempUser, newUserData, otp);
  } else {
    return createTempUser(newUserData, otp);
  }
};

const validateRegisterInput = ({ email, password }) => {
  if (!verifyUtils.isValidEmail(email)) {
    return { success: false, code: "INVALID_EMAIL" };
  }

  if (!verifyUtils.isValidPassword(password)) {
    return { success: false, code: "INVALID_PASSWORD" };
  }
  return { success: true };
};

const checkDuplicatedUser = async (email) => {
  if (await isUserExist(email)) {
    return { success: false, code: "USER_EXIST" };
  }

  return { success: true };
};

exports.handleRegister = async (newUserData) => {
  const { email } = newUserData;

  const validation = validateRegisterInput(newUserData);
  if (!validation.success) return validation;

  const userDuplicated = await checkDuplicatedUser(email);
  if (!userDuplicated.success) return userDuplicated;

  const OTP = await generateOTP();
  await createOrUpdateTempUser(newUserData, OTP);
  sendOtpEmail(email, OTP);

  return { success: true, code: "REGISTER_COMPLETE" };
};

function isOTPValid(tempUser, otp) {
  if (!tempUser) return false;
  return String(tempUser.otp) === String(otp);
}

async function createUserFromTemp(tempUser) {
  const { email, password, userFullname } = tempUser;

  const newUser = new User({
    email,
    password,
    userFullname,
  });

  await newUser.save();
  return newUser;
}

const deleteTempUser = async (email) => {
  await TempUser.deleteOne({ email: email });
};

async function loginAfterVerifyOTP(email, req) {
  const user = await User.findOne({ email: email });
  handleStoreToken(user, req);
}

async function getValidTempUser(email, OTP) {
  const tempUser = await TempUser.findOne({ email });

  if (!tempUser) {
    return { success: false, code: "TEMP_USER_EXPIRED" };
  }

  if (!isOTPValid(tempUser, OTP)) {
    return { success: false, code: "INVALID_OTP" };
  }

  return { success: true, tempUser };
}

exports.handleVerifyOTP = async (verifyData, req) => {
  const { email, OTP } = verifyData;

  const { success, code, tempUser } = await getValidTempUser(email, OTP);

  if (!success) return { success, code };

  await createUserFromTemp(tempUser);
  await deleteTempUser(email);
  await loginAfterVerifyOTP(email, req);

  return { success: true };
};

const checkCredentials = async (loginData) => {
  const verifyCredentialsData = verifyUtils.verifyEmptyData(loginData);

  if (!verifyCredentialsData.success) return verifyCredentialsData;

  const { email, password } = loginData;

  const user = await User.findOne({ email: email });
  if (!user) {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }

  return { success: true, user };
};

const handleStoreToken = (user, req) => {
  const token = jwtUtils.generateToken(user);
  const refreshToken = jwtUtils.generateRefreshToken(user);

  req.session.token = token;
  req.session.refreshToken = refreshToken;
};

exports.handleLogin = async (loginData, req) => {
  const { success, code, user } = await checkCredentials(loginData);

  if (!success) return { success: false, code };

  handleStoreToken(user, req);

  return {
    success: true,
    user: userUtils.getPublicUser(user),
  };
};

const verifyTokenAndGetUser = async (refreshToken) => {
  if (!refreshToken) return { success: false, code: "NO_TOKEN" };

  const { success, decoded } = jwtUtils.verifyRefreshToken(refreshToken);
  if (!success) return { success: false, code: "INVALID_TOKEN" };

  const user = await User.findById(decoded.id);
  if (!user) return { success: false, code: "USER_NOT_FOUND" };

  return { success: true, user };
};

exports.handleRefreshToken = async (refreshToken, req) => {
  console.log("Refresh Token Call");
  const verifyResult = await verifyTokenAndGetUser(refreshToken);
  if (!verifyResult.success) return verifyResult;

  handleStoreToken(verifyResult.user, req);
  return { success: true };
};

exports.handleGetUser = async (userId) => {
  const cacheField = "info";

  const user = await getOrSetCache(userId, cacheField, async () => {
    const data = await userUtils.prepareUser(userId);
    if (!data.success) return data;
    return userUtils.getPublicUser(data.user);
  });

  if (!user) {
    return { success: false };
  }

  return { success: true, user };
};

const prepareUserByUsername = async (username) => {
  const user = await User.findOne({ username }).select("-password");
  if (!user) {
    return { success: false, code: "USER_NOT_FOUND" };
  }
  return { success: true, user: user };
};

exports.handeGetUserByUsername = async (username) => {
  const result = await prepareUserByUsername(username);
  if (!result.success) return result;

  return { success: true, user: result.user };
};
