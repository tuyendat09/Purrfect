const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const token = req.session.token;
      if (!token) {
        return res.status(401).json({
          success: false,
          message:
            "Oops! Looks like you’re not logged in. Mind signing in first?",
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Not quite enough superpowers for this action.",
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
