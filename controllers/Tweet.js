const Tweet = require('../models/Tweet');
const User = require('../models/User');
const validator = require('validator');
const moment = require('moment');
const fs = require('fs');
exports.tweet = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  const validationErrors = [];
  if (validator.isEmpty(req.body.tweet)) validationErrors.push({ msg: 'Tweet cannot be blank.' });
  if (validationErrors.length) {
    req.flash('error', validationErrors);
    return res.redirect('/home');
  }


  User.findOne({username: req.session.passport.user.username }, function (err, user) {
    let tweet = new Tweet;
    tweet.username = req.session.passport.user.username;
    tweet.name = user.profile.name;
    tweet.timestamp = new Date();
    tweet.content = req.body.tweet,
    tweet.img.data = fs.readFileSync(req.file.path);
    tweet.img.contentType = req.file.mimetype;
    tweet.save(function(err) {
      if (err) {
        req.flash('error', 'Unable to save tweet');
      }
      res.redirect('/home');
    });
  });

};
