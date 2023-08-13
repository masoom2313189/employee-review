const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/employeeSchema');

// authentication using passport
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    function (req, email, password, done) {
      User.findOne({ email }, function (error, user) {
        if (error) {
          console.log(`Error in finding employee`);
          return done(error);
        }
        if (!user || user.password !== password) {
          console.log(`Invalid Credentials`);
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (error, user) {
    if (error) {
      console.log(`Error in finding user -> passport`);
      return done(error);
    }
    return done(null, user);
  });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/employee/signin');
};

// check for admin
passport.checkAdmin = function (req, res, next) {
  if (!req.user.isAdmin) {
    console.log(`Employees are not allowed to access this resource`);
    return res.redirect('back');
  }
  return next();
};

// set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
