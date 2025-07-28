const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "mysecret"; // Secret key for JWT token generation

// ✅ REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔍 Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.send("Registered successfully");
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).send("Server error");
  }
});

// ✅ LOGIN USER
// Example login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "mysecret", { expiresIn: "2h" });

  res.status(200).json({
    token,
    name: user.name, // ✅ this is critical
  });
});

module.exports = router;
