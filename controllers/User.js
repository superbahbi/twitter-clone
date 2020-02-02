const User = require('../models/User');
const passport = require('passport');
const validator = require('validator');
const moment = require('moment');
exports.postSignup = (req, res) => {

  const strDate = moment().month(req.body.month).format("MM") + "-" + req.body.day + "-" + req.body.year;
  const date = moment(strDate).format('MM-DD-YYYY');
  console.log(req.body);

  const validationErrors = [];
  if (validator.isEmpty(req.body.username)) validationErrors.push({ msg: 'Please enter a username.' });
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });
  if (validator.isEmpty(req.body.cpassword)) validationErrors.push({ msg: 'Confirm Password cannot be blank.' });
  if (!validator.equals(req.body.password, req.body.cpassword)) validationErrors.push({ msg: 'Password is not match.' });
  if (validator.isEmpty(req.body.gender)) validationErrors.push({ msg: 'Please pick a gender.' });
  if (validator.isEmpty(req.body.phone)) validationErrors.push({ msg: 'Please enter a phone number.' });
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
      birthday: date
    }
  }), req.body.password, function(err, user) {
    if (err) {
      req.flash('error', {
        msg: err.message
      });
      res.redirect("/");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/home");
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

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    console.log()
    if (err) {
      console.log(err);
    } else {
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
          res.redirect('/home');
        }
      })(req, res, next);
    }
  });

};
exports.home = (req, res) => {
    res.render("home");
};
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.profile = (req, res, next) => {
  const { profile } = req.params;
  User.findOne({username: profile}, function(err, foundUser){
    if(foundUser){
      console.log("Current user id: " + foundUser._id); // current user
      console.log("Session user id: " + req.session.passport.user._id); // Current login session id
      res.render("profile", {foundUser});
      console.log(foundUser);
    }
  });
};
