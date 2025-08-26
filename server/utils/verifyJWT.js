const jwt = require("jsonwebtoken");
const { JWT_REFRESH_SECRET } = process.env;

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
