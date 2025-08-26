const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

const JWT_EXPIRES_IN = "30m";
const REFRESH_JWT_EXPIRES_IN = "365d";

exports.generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
    role: user.userRole,
  };

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_JWT_EXPIRES_IN,
  });
  return refreshToken;
};

exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.userRole,
    profilePicture: user.profilePicture,
    displayName: user.displayName,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return token;
};
