const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

const JWT_EXPIRES_IN = "30m";
const REFRESH_JWT_EXPIRES_IN = "365d";

function preparePayload(user) {
  const payload = {
    id: user._id,
    role: user.userRole,
    profilePicture: user.profilePicture,
    username: user.username,
    userFullname: user.userFullname,
  };
  return payload;
}

exports.generateRefreshToken = (user) => {
  const payload = preparePayload(user);

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_JWT_EXPIRES_IN,
  });
  return refreshToken;
};

exports.generateToken = (user) => {
  const payload = preparePayload(user);

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return token;
};
