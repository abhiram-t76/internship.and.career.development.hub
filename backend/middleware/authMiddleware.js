const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token =
        req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token failed",
    });
  }
};
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({
      message: "Admin only",
    });
  }
};
module.exports = {
  protect,
  adminOnly,
};