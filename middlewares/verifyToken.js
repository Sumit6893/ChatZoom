const jwt = require("jsonwebtoken");
require("dotenv").config();

// 🔐 Secret key for JWT (should be stored in .env in production)
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Middleware to verify JWT Token
module.exports = (req, res, next) => {
  // 📥 Extract token from Authorization header (format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  // ❌ If token is missing
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    // ✅ Verify token and attach user data to the request
    req.user = jwt.verify(token, JWT_SECRET);
    next(); // proceed to next middleware or route handler
  } catch (error) {
    // ❌ Invalid token
    res.status(401).send("Invalid token");
  }
};
