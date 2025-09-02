const bcrypt = require("bcrypt");
const User = require("../models/User");
const TempUser = require("../models/TempUser");
const { sendOtpEmail, generateOTP } = require("../utils/sendOTP");
const { isValidEmail, isValidPassword } = require("../utils/verifyResigerData");
const isDocumentExist = require("../utils/isDocumentExist");
const {
  handleGenerateToken,
  generateToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const verifyEmptyData = require("../utils/verifyEmptyData");
const { verifyRefreshToken } = require("../utils/verifyJWT");

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
  if (!isValidEmail(email)) return { success: false, code: "INVALID_EMAIL" };
  if (!isValidPassword(password))
    return { success: false, code: "INVALID_PASSWORD" };
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
  const user = await isUserExist(email);
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
  const verifyCredentialsData = verifyEmptyData(loginData);

  if (!verifyCredentialsData.success) return verifyCredentialsData;

  const { email, password } = loginData;

  const user = await isUserExist(email);
  if (!user) {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }

  return { success: true, user };
};

const getPublicUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    profilePicture: user.profilePicture,
  };
};

const handleStoreToken = (user, req) => {
  console.log("call");
  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  req.session.token = token;
  req.session.refreshToken = refreshToken;
  console.log(req.session);
};

exports.handleLogin = async (loginData, req) => {
  const { success, code, user } = await checkCredentials(loginData);

  if (!success) return { success: false, code };

  handleStoreToken(user, req);

  return {
    success: true,
    user: getPublicUser(user),
  };
};

const verifyTokenAndGetUser = async (refreshToken) => {
  if (!refreshToken) return { success: false, code: "NO_TOKEN" };

  const { success, decoded } = verifyRefreshToken(refreshToken);
  if (!success) return { success: false, code: "INVALID_TOKEN" };

  const user = await User.findById(decoded.id);
  if (!user) return { success: false, code: "USER_NOT_FOUND" };

  return { success: true, user };
};

exports.handleRefreshToken = async (refreshToken, req) => {
  const verifyResult = await verifyTokenAndGetUser(refreshToken);
  if (!verifyResult.success) return verifyResult;

  handleStoreToken(verifyResult.user, req);
  return { success: true };
};

async function checkUsernameExist(username) {
  const existing = await User.findOne({
    username,
  });
  return !!existing;
}

async function updateUserName(user, username) {
  user.username = username;
  await user.save();
  return user;
}

const validateUserNameChange = async (email, username) => {
  const emptyCheck = verifyEmptyData({ email, username });
  if (!emptyCheck.success) return emptyCheck;

  const user = await isUserExist(email);
  if (!user) return { success: false, code: "USER_NOTFOUND" };

  const usernameExist = await checkUsernameExist(username);
  if (usernameExist) return { success: false, code: "USERNAME_EXIST" };

  return { success: true, user };
};

exports.handleChangeUserName = async (email, username) => {
  const { success, code, user } = await validateUserNameChange(email, username);

  if (!success) return { success, code };

  await updateUserName(user, username);

  return { success: true };
};

const prepareUser = async (userId) => {
  const user = await User.findById(userId).lean();

  if (!user) {
    return { success: false, code: "USER_NOT_FOUND" };
  }
  return user;
};

exports.handleGetUser = async (userId) => {
  const result = await prepareUser(userId);

  if (!user) {
    return result;
  }

  const publicUser = getPublicUser(result);
  return { success: true, user: publicUser };
};
