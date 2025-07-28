const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //   console.log("Access Token:", accessToken);
      console.log("Profile:", profile);
      let user = await User.findOne({
        email: profile.username + "@github.com",
      });
      if (!user) {
        user = await User.create({
          name: profile.displayName || profile.username,
          email: profile.username + "@github.com",
          password: "github", // dummy
        });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
