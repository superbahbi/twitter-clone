const User = require('../models/User');
const Tweet = require('../models/Tweet');
const moment = require('moment');
/**
 * GET /
 * Home page.
 */
exports.test = (req, res) => {
  res.send('test result');
};
exports.index = (req, res) => {

  if (req.isAuthenticated()) {
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
  } else {
    res.render('index', {
      title: 'Home'
    });
  }
};
