const User = require('../models/User');
const Tweet = require('../models/Tweet');
const passport = require('passport');
const validator = require('validator');
const moment = require('moment');
const _ = require('lodash');

exports.postSignup = (req, res) => {

  const strDate = moment().month(req.body.month).format("MM") + "-" + req.body.day + "-" + req.body.year;
  const date = new Date(strDate).getTime() / 1000
  console.log(date + " " + strDate);
  console.log(req.body);

  const validationErrors = [];
  if (validator.isEmpty(req.body.username)) validationErrors.push({
    msg: 'Please enter a username.'
  });
  if (!validator.isEmail(req.body.email)) validationErrors.push({
    msg: 'Please enter a valid email address.'
  });
  if (validator.isEmpty(req.body.password)) validationErrors.push({
    msg: 'Password cannot be blank.'
  });
  if (validator.isEmpty(req.body.cpassword)) validationErrors.push({
    msg: 'Confirm Password cannot be blank.'
  });
  if (!validator.equals(req.body.password, req.body.cpassword)) validationErrors.push({
    msg: 'Password is not match.'
  });
  if (validator.isEmpty(req.body.gender)) validationErrors.push({
    msg: 'Please pick a gender.'
  });
  if (validator.isEmpty(req.body.phone)) validationErrors.push({
    msg: 'Please enter a phone number.'
  });
  if (validationErrors.length) {
    req.flash('error', validationErrors);
    return res.redirect('/');
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });

  User.register(new User({
    username: req.body.username,
    profile: {
      name: null,
      email: req.body.email,
      bio: null,
      gender: req.body.gender,
      phone: req.body.phone,
      birthday: date,
      regDate: Math.round((new Date()).getTime() / 1000)
    }
  }), req.body.password, function(err, user) {
    if (err) {
      req.flash('error', {
        msg: err.message
      });
      res.redirect("/");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      });
    }
  });
};
/**
 * GET /
 * Login page.
 */
exports.getLogin = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};
/**
 * Post /
 * Login request page.
 */
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (validator.isEmpty(req.body.username)) validationErrors.push({
    msg: 'Please enter a username.'
  });
  if (validator.isEmpty(req.body.password)) validationErrors.push({
    msg: 'Please enter a password.'
  });
  if (validationErrors.length) {
    req.flash('error', validationErrors);
    return res.redirect('/');
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
      console.log()
      if (err) {
        console.log(err);
      } else {
        if (req.body.username && req.body.password) {
        passport.authenticate('local', function(error, user, info) {
          // A error also means, an unsuccessful login attempt
          if (error) {
            console.error(error);
            console.log('Failed login:');
            // And do whatever you want here.
            return next(new Error('AuthenticationError'), req, res);
          }

          if (user === false) {
            // handle login error ...
            req.flash('error', {
              msg: info.message
            });
            res.redirect("/");
          } else {
            // handle successful login ...
            req.flash('success', {
              msg: "Successfully authenticated"
            });
            res.redirect('/');
          }
        })(req, res, next);
      }
    }
  });

};
exports.home = (req, res) => {
  let foundUser = {};

  User.findOne({
    username: req.user.username
  }, function(err, user) {
    if (err) {
      req.flash('error', 'Could not find any user');
      res.redirect('/home');
    } else {
      foundUser = user;
      Tweet.find({}).sort([
        ['timestamp', -1]
      ]).exec(function(err, foundTweet) {
        if (err) {
          req.flash('error', 'Could not find any tweets');
          res.redirect('/home');
        } else {
          res.render('home', {
            foundTweet,
            foundUser,
            moment
          });
        }
      });
    }
  });



};
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.profile = (req, res, next) => {
  const {
    profile
  } = req.params;
  User.findOne({
    username: profile
  }, function(err, foundUser) {
    if (foundUser) {
      console.log("Current user id: " + foundUser._id); // current user
      console.log("Session user id: " + req.user._id); // Current login session id
      const regDate = moment.unix(foundUser.profile.regDate).format("MMMM YYYY");

      res.render("profile", {
        foundUser,
        regDate
      });
    }
  });
};
exports.editprofile = async (req, res, next) => {
  User.findOne({
    username: req.user.username
  }, function(err, user) {
    console.log(req.user);
    console.log(req.body);
    console.log(user);
    user.profile.name = req.body.name || '';
    user.profile.bio = req.body.bio || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', {
        msg: 'Profile information has been updated.'
      });
      const regDate = moment.unix(user.profile.regDate).format("MMMM YYYY");
      console.log(user);
      res.render('profile', {
        foundUser: user,
        regDate
      });
    });
  });
};
exports.upload = async (req, res, next) => {
  User.findOne({
    username: req.user.username
  }, function(err, user) {

    if (req.body.source === 'upload-profile-img') {
      // upload profile image
      user.profile.avatar.data = req.file.buffer.toString("base64") || '';
      user.profile.avatar.contentType = req.file.mimetype || '';
      req.flash('success', {
        msg: 'Profile picture has been updated.'
      });
    } else if (req.body.source === 'upload-cover-img') {
      // upload cover image
      user.profile.cover.data = req.file.buffer.toString("base64") || '';
      user.profile.cover.contentType = req.file.mimetype || '';
      req.flash('success', {
        msg: 'Profile cover has been updated.'
      });
    }
    user.save((err) => {
      if (err) {
        return next(err);
      }
    });
  });
}
