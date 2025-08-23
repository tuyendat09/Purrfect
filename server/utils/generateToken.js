const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = "1h";

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
