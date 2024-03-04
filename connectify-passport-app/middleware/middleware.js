const bcrypt = require('bcryptjs');
const localStrategyImport = require('passport-local');
const User = require('../models/user');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

const localStrategy = () => {
  return new localStrategyImport(
    { usernameField: "email", passwordField: "password" },
      async (username, password, done) => {
        let result = await User.findOne({ email: username });
        if (result != null) {

          if (bcrypt.compareSync(password, result.password)) {
            return done(null, result);
          } else {
            return done(null, false, { message: "Invalid Credentials" });
          }
        } else {
          return done(null, false, { message: "Invalid Credentials" });
        }
    }
  )
}

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (!err) {
      res.redirect("/login");
    }
  });
}


module.exports = {isLoggedIn, localStrategy, logoutUser};

