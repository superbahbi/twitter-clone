const Tweet = require('../models/Tweet');
const User = require('../models/User');
const validator = require('validator');
const moment = require('moment');

exports.tweet = (req, res, next) => {
  console.log(req.body);
  const validationErrors = [];
  if (validator.isEmpty(req.body.tweet)) validationErrors.push({ msg: 'Tweet cannot be blank.' });
  if (validationErrors.length) {
    req.flash('error', validationErrors);
    return res.redirect('/home');
  }


  User.findOne({username: req.session.passport.user.username }, function (err, user) {
    const tweet = new Tweet({
      username: req.session.passport.user.username,
      name: user.profile.name,
      timestamp: new Date(),
      content: req.body.tweet,
    });
    tweet.save(function(err) {
      if (err) {
        req.flash('error', 'Unable to save tweet');
      }
      res.redirect('/home');
    });
  });

};
