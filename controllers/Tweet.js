const Tweet = require('../models/Tweet');
const User = require('../models/User');
const validator = require('validator');
const moment = require('moment');
const fs = require('fs');


exports.tweet = (req, res, next) => {
  let tweet = new Tweet;
  const validationErrors = [];
  if (validator.isEmpty(req.body.tweet) && isEmptyObject(req.file)) {
    validationErrors.push({
      msg: 'Tweet cannot be blank.'
    });
  }
  if (!isEmptyObject(req.file)) {
    switch (req.file.mimetype) {
      case "image/gif":
      case "image/png":
      case "image/jpeg":
        tweet.img.data = req.file.buffer.toString("base64");
        tweet.img.contentType = req.file.mimetype;
        break;
      default:
        validationErrors.push({
          msg: 'Invalid file type.'
        });
        break;
    }
  }
  if (validationErrors.length) {
    req.flash('error', validationErrors);
    return res.redirect('/home');
  }
  User.findOne({
    username: req.user.username
  }, function(err, user) {
    tweet.username = req.user.username;
    tweet.name = user.profile.name;
    tweet.timestamp = new Date();
    tweet.content = req.body.tweet;
    tweet.save(function(err) {
      if (err) {
        req.flash('error', 'Unable to save tweet');
      }
    });
  });
  res.redirect('/home');
};

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
