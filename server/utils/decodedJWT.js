const jwt = require("jsonwebtoken");

exports.getUserIdFromRequest = (token) => {
  try {
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.id || null;
  } catch (error) {
    return null;
  }
};
