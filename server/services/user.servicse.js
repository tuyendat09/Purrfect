const User = require("../models/User");
const {
  handleUpdateUserImage,
  handleDeleteFile,
} = require("../utils/uploadToDrive");
const bcrypt = require("bcrypt");

const verifyUtils = require("../utils/verify.utils");
const userUtils = require("../utils/user.utils");

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

const validateUserNameChange = async (userId, username) => {
  const emptyCheck = verifyUtils.verifyEmptyData(username);
  if (!emptyCheck.success) return emptyCheck;

  const user = await User.findById(userId);

  if (!user) return { success: false, code: "USER_NOTFOUND" };

  const usernameExist = await checkUsernameExist(username);
  if (usernameExist) return { success: false, code: "USERNAME_EXIST" };

  return { success: true, user };
};

exports.handleChangeUserName = async (userId, username) => {
  const { success, code, user } = await validateUserNameChange(
    userId,
    username
  );

  if (!success) return { success, code };

  await updateUserName(user, username);
  await revalidateCache(userId);

  return { success: true };
};

const updateProfilePicture = async (user, newImage) => {
  user.profilePicture = newImage;
  await user.save();
  return user;
};

const handleCheckImageSize = (fileSize) => {
  const MAX_SIZE = 10 * 1024 * 1024;
  if (fileSize > MAX_SIZE) {
    return { sucesss: false, code: "INVALID_IMAGE_SIZE" };
  }
  return { success: true };
};

const handleDeleteOldProfilePicture = async (userOldProfilePicture) => {
  if (userOldProfilePicture === "default-user-picture") {
    return;
  }

  const queryParams = new URLSearchParams(userOldProfilePicture.split("?")[1]);
  const oldFileId = queryParams.get("id");

  if (oldFileId) {
    await handleDeleteFile(oldFileId);
    console.log("Deleted old file ID:", oldFileId);
  }
};

exports.handleUpdateProfilePicture = async (userId, newImage) => {
  const result = await userUtils.prepareUser(userId);
  if (!result.success) return result;

  const validatedImageSize = handleCheckImageSize(newImage.size);
  if (!validatedImageSize.success) return validatedImageSize;

  const newUserPictureUrl = await handleUpdateUserImage(newImage);
  await Promise.all([
    handleDeleteOldProfilePicture(result.user.profilePicture),
    updateProfilePicture(result.user, newUserPictureUrl),
  ]);

  await userUtils.revalidateCache(userId);

  return { success: true };
};

const updateUserData = async (userId, newUserData) => {
  if (newUserData.password) {
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {
    $set: newUserData,
  });

  if (!updatedUser) {
    return { success: false, code: "USER_NOTFOUND" };
  }
  return { success: true };
};

exports.handleEditUserData = async (userId, newUserData) => {
  const verifyEmptyData = verifyUtils.verifyEmptyData(newUserData, ["userBio"]);

  if (!verifyEmptyData.success) return verifyEmptyData;
  const updateResult = await updateUserData(userId, newUserData);
  if (!updateResult.success) return updateResult;

  return { success: true };
};
