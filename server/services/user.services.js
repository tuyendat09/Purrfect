const User = require("../models/User");

exports.findOneUser = async (userData) => {
  const user = User.findOne({ _id: userData });
  return user;
};
