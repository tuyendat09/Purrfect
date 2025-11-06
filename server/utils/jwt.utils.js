const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const JWT_EXPIRES_IN = "30m";
const REFRESH_JWT_EXPIRES_IN = "365d";

exports.verifyRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    if (!decoded) {
      return { success: false };
    }
    return { success: true, decoded: decoded };
  } catch (error) {
    return null;
  }
};

function preparePayload(user) {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.userRole,
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
