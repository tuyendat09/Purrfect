const User = require("../models/User");
const { getOrSetCache } = require("../utils/redisCache");
const { handleUpdateUserImage } = require("../utils/uploadToDrive");
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
  const emptyCheck = verifyEmptyData({ username });
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

// const handleDeleteOldProfilePicture = async () => {

// }

const updateProfilePicture = async (user, newImage) => {
  console.log(user);
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

exports.handleUpdateProfilePicture = async (userId, newImage) => {
  const result = await userUtils.prepareUser(userId);
  if (!result.success) return result;

  const validatedImageSize = handleCheckImageSize(newImage.size);
  if (!validatedImageSize.success) return validatedImageSize;

  const newUserPictureUrl = await handleUpdateUserImage(newImage);
  await updateProfilePicture(result.user, newUserPictureUrl);
  await userUtils.revalidateCache(userId);
  return { success: true };
};
