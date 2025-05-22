const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      console.log(req.session);
      const token = req.session.token;
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token found" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      if (!allowedRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Access denied. Insufficient permissions.",
          });
      }

      req.user = decoded;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
};

module.exports = checkRole;
