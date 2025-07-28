const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login.html",
  }),
  async (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name },
      "mysecret",
      { expiresIn: "2h" }
    );

    // Redirect with token and name
    res.redirect(
      `/dashboard.html?token=${token}&name=${encodeURIComponent(req.user.name)}`
    );
  }
);

module.exports = router;
