const Tweet = require('../models/Tweet');
const User = require('../models/User');
const validator = require('validator');
const moment = require('moment');
const fs = require('fs');
const _ = require('lodash');
const ObjectID = require('mongodb').ObjectID;

exports.tweet = (req, res, next) => {
  let tweet = new Tweet;
  const validationErrors = [];
  if (validator.isEmpty(req.body.tweet) && _.isEmpty(req.file)) {
    validationErrors.push({
      msg: 'Tweet cannot be blank.'
    });
  }
  if (!_.isEmpty(req.file)) {
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
    return res.redirect('/');
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
  res.redirect('/');
};
exports.tweetStatus = (req, res, next) => {
  console.log(req.params);
  const objectId2 = new ObjectID(req.params.id);
  User.findOne({ username: req.params.profile }, function (err, user) {
    if (err) {
      console.log(err);
    }
    const foundUser = user;
    Tweet.findOne({ _id: req.params.id }, function (err, foundTweet) {
      if (err) {
        console.log(err);
      }
      res.render('tweet', {
        foundTweet,
        foundUser,
        moment
      });
    });
  });
};
