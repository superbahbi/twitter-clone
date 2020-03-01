const { ObjectId } = require("mongodb");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const passport = require("passport");
const validator = require("validator");
const moment = require("moment");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const upload = require("../models/Upload");

exports.postSignup = (req, res) => {
  User.register(
    new User({
      _id: new ObjectId(),
      username: req.body.username,
      profile: {
        name: null,
        email: req.body.email,
        bio: null,
        gender: req.body.gender,
        phone: req.body.phone,
        birthday: req.body.birthday,
        regDate: Math.round(new Date().getTime() / 1000)
      }
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        res.json(err);
      } else {
        res.json("Success");
      }
    }
  );
};
/**
 * Post /
 * Login request page.
 */
exports.postLogin = (req, res, next) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Authentication failed! Please check the request"
      });
    } else {
      passport.authenticate("local", function(error, user, info) {
        if (user) {
          user = user.toObject();
          delete user.salt;
          delete user.hash;
          let token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: "24h"
          });

          // return the JWT token for the future API calls
          res.status(200).json({
            success: true,
            message: "Authentication successful!",
            token: token,
            user: user
          });
        } else {
          res.status(403).json({
            success: false,
            message: "Incorrect username or password"
          });
        }
      })(req, res, next);
    }
  });
};

exports.getAllTweet = (req, res) => {
  Tweet.aggregate(
    [
      {
        $lookup: {
          from: "users",
          localField: "username",
          foreignField: "username",
          as: "user_data"
        }
      },
      {
        $project: {
          "user_data.salt": 0,
          "user_data.hash": 0
        }
      },
      {
        $unwind: {
          path: "$user_data",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          timestamp: -1
        }
      }
    ],
    function(err, foundTweet) {
      if (err) {
        console.log(err);
      }
      res.send({
        foundTweet
      });
    }
  );
};
exports.getUserTweet = (req, res) => {
  Tweet.aggregate(
    [
      { $match: { username: req.params.username } },
      {
        $lookup: {
          from: "users",
          localField: "username",
          foreignField: "username",
          as: "user_data"
        }
      },
      {
        $project: {
          "user_data.salt": 0,
          "user_data.hash": 0
        }
      },
      {
        $sort: {
          timestamp: -1
        }
      },
      {
        $unwind: {
          path: "$user_data",
          preserveNullAndEmptyArrays: true
        }
      }
    ],
    function(err, foundTweet) {
      if (err) {
        console.log(err);
      }
      res.send({
        foundTweet
      });
    }
  );
};
exports.getUser = (req, res) => {
  User.findOne({ username: req.params.username }, (err, foundUser) => {
    if (err) {
      res.json(err);
    }
    res.json(foundUser);
  });
};
exports.postTweet = (req, res, next) => {
  // TODO: Data validator
  //Creating new tweet data
  let tweet = new Tweet();
  // Adding new tweet to mongodb
  User.findOne(
    {
      username: req.decoded.username
    },
    function(err, user) {
      tweet._id = new ObjectId();
      tweet.username = user.username;
      tweet.name = user.profile.name;
      tweet.timestamp = new Date();
      tweet.content = req.body.tweet;
      if (!_.isEmpty(req.file)) {
        switch (req.file.mimetype) {
          case "image/gif":
          case "image/png":
          case "image/jpeg":
            upload.uploadToCloud(req, (result, error) => {
              tweet.img.filename = result.url;
              tweet.save(function(err, t) {
                if (err) {
                  res.status(400).json(err);
                  return;
                } else {
                  res.send(t);
                  return;
                }
              });
            });
            break;
          default:
            res.status(406).json("Invalid file");
            break;
        }
      }
    }
  );
};
exports.deleteTweet = (req, res, next) => {
  Tweet.deleteOne({ _id: req.body.id }, function(err, result) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(result);
    }
  });
};
exports.updateUser = async (req, res, next) => {
  console.log(req.body);

  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      switch (req.body.field) {
        case "name":
          user.profile.name = req.body.content;
          break;
        case "bio":
          user.profile.bio = req.body.content;
          break;
        case "location":
          user.profile.location = req.body.content;
          break;
        case "website":
          user.profile.website = req.body.content;
          break;
      }

      user.save(err => {
        if (err) {
          return next(err);
        }

        res.json("Success");
      });
    }
  );
};
exports.uploadPhoto = async (req, res, next) => {
  console.log("Change");
  console.log(req.body);

  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (!_.isEmpty(req.file)) {
        if (err) {
          res.status(400).json(err);
        }
        switch (req.file.mimetype) {
          case "image/gif":
          case "image/png":
          case "image/jpeg":
            upload.uploadToCloud(req, (result, error) => {
              switch (req.body.type) {
                case "avatar":
                  user.profile.avatar.filename = result.url;
                  break;
                case "cover":
                  user.profile.cover.filename = result.url;
                  break;
                default:
                  res.status(400).json("Invalid type");
                  break;
              }
              console.log(req.body.type);
              console.log(result.url);
              user.save(err => {
                if (err) {
                  return next(err);
                }
              });
            });
            break;
          default:
            res.status(400).json("Invalid file");
            break;
        }
      }

      user.save(err => {
        if (err) {
          return next(err);
        }

        res.json("Success");
      });
    }
  );
};
