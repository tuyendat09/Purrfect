const User = require("../models/User");
const { getOrSetCache } = require("./redisCache");

exports.getPublicUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    userFullname: user.userFullname,
    profilePicture: user.profilePicture,
  };
};

exports.prepareUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return { success: false, code: "USER_NOT_FOUND" };
  }
  return { success: true, user: user };
};

exports.revalidateCache = async (userId) => {
  const cacheField = "info"; // field riêng cho user info

  await getOrSetCache(
    userId,
    cacheField,
    async () => {
      const data = await this.prepareUser(userId);
      if (!data.success) return data;
      return this.getPublicUser(data.user);
    },
    300,
    true
  );
};
