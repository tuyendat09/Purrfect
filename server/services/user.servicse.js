const User = require("../models/User");
const { getOrSetCache } = require("../utils/redisCache");
const { updateUserImage } = require("../utils/uploadToDrive");

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

const revalidateCache = async (userId) => {
  const cacheField = "info"; // field riêng cho user info

  await getOrSetCache(
    userId,
    cacheField,
    async () => {
      const user = await prepareUser(userId);
      if (!user || user.success === false) return null;
      return getPublicUser(user);
    },
    300,
    true
  );
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

exports.handleUpdateProfilePicture = async (
  // userId,
  newImage
) => {
  await updateUserImage(newImage);
};
