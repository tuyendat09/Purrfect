const jwt = require("jsonwebtoken");
const { JWT_REFRESH_SECRET } = process.env;

exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.isValidPassword = (password) => {
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  return passwordRegex.test(String(password));
};

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

exports.verifyEmptyData = (data, exclude = []) => {
  const CODE = "EMPTY_DATA";

  const isEmpty = (value) =>
    value === undefined || value === null || value === "";

  const shouldCheck = (key) => !exclude.includes(key);

  if (!Array.isArray(data)) {
    for (const key in data) {
      if (shouldCheck(key) && isEmpty(data[key])) {
        return { success: false, code: CODE };
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      for (const key in item) {
        if (shouldCheck(key) && isEmpty(item[key])) {
          return { success: false, code: CODE };
        }
      }
    }
  }

  return { success: true };
};
