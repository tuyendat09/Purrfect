const bcrypt = require("bcrypt");
const User = require("../models/User");
const TempUser = require("../models/TempUser");
const { sendOtpEmail, generateOTP } = require("../utils/sendOTP");
const { isValidEmail, isValidPassword } = require("../utils/verifyResigerData");
const isDocumentExist = require("../utils/isDocumentExist");
const { generateToken } = require("../utils/generateToken");
const verifyEmptyData = require("../utils/verifyEmptyData");

const isUserExist = (email) => {
  return isDocumentExist(User, { email: email });
};

const isTempUserExist = (email) => {
  return isDocumentExist(TempUser, { email: email });
};

const createTempUser = async (newUserData, otp) => {
  const { email, password } = newUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const tempUser = new TempUser({
    email: email,
    password: hashedPassword,
    otp,
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
  await sendOtpEmail(email, OTP);

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

const deleteTempUser = async (email) => {
  await TempUser.deleteOne({ email: email });
};

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

const checkCredentials = async (loginData) => {
  const verifyCredentialsData = verifyEmptyData(loginData);

  if (!verifyCredentialsData.success) return verifyCredentialsData;

  const { email, password } = loginData;

  const user = await User.findOne({ email });
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
    displayName: user.displayName,
    profilePicture: user.profilePicture,
  };
};

exports.handleLogin = async (loginData, req) => {
  const { success, code, user } = await checkCredentials(loginData);

  if (!success) return { success: false, code };

  const token = generateToken(user);
  req.session.token = token;

  return {
    success: true,
    user: getPublicUser(user),
  };
};
