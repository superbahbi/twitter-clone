const User = require("../models/User");
const Tweet = require("../models/Tweet");
const passport = require("passport");
const validator = require("validator");
const moment = require("moment");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const authentication = require(".././models/authentication");
exports.postSignup = (req, res) => {
  const strDate =
    moment()
      .month(req.body.month)
      .format("MM") +
    "-" +
    req.body.day +
    "-" +
    req.body.year;
  const date = new Date(strDate).getTime() / 1000;
  console.log(date + " " + strDate);
  console.log(req.body);

  const validationErrors = [];
  if (validator.isEmpty(req.body.username))
    validationErrors.push({
      msg: "Please enter a username."
    });
  if (!validator.isEmail(req.body.email))
    validationErrors.push({
      msg: "Please enter a valid email address."
    });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({
      msg: "Password cannot be blank."
    });
  if (validator.isEmpty(req.body.cpassword))
    validationErrors.push({
      msg: "Confirm Password cannot be blank."
    });
  if (!validator.equals(req.body.password, req.body.cpassword))
    validationErrors.push({
      msg: "Password is not match."
    });
  if (validator.isEmpty(req.body.gender))
    validationErrors.push({
      msg: "Please pick a gender."
    });
  if (validator.isEmpty(req.body.phone))
    validationErrors.push({
      msg: "Please enter a phone number."
    });
  if (validationErrors.length) {
    req.flash("error", validationErrors);
    return res.redirect("/");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false
  });

  User.register(
    new User({
      username: req.body.username,
      profile: {
        name: null,
        email: req.body.email,
        bio: null,
        gender: req.body.gender,
        phone: req.body.phone,
        birthday: date,
        regDate: Math.round(new Date().getTime() / 1000)
      }
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        req.flash("error", {
          msg: err.message
        });
        res.redirect("/");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/");
        });
      }
    }
  );
};
/**
 * GET /
 * Login page.
 */
exports.getLogin = (req, res) => {
  res.render("login", {
    title: "Login"
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
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    } else {
      if (req.body.username && req.body.password) {
        passport.authenticate("local", { session: false }, function(
          error,
          user,
          info
        ) {
          if (error) {
            res.json("error2");
            console.log("Failed login:");
            // And do whatever you want here.
            return next(new Error("AuthenticationError"), req, res);
          } else if (user === false) {
            // handle login error ...
            return res.json("error: username  or password doesnt match!");
          } else {
            // Delete user salt and hash from user object
            user = user.toObject();
            delete user.salt;
            delete user.hash;
            // create jwt token by sign it with jwt secret in the .env
            const token = jwt.sign(
              JSON.stringify(user),
              process.env.JWT_SECRET
            );
            return res.json({ user, token });
          }
        })(req, res, next);
      }
    }
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.getAllTweet = (req, res) => {
  User.aggregate(
    [
      {
        $lookup: {
          from: "tweets",
          localField: "username",
          foreignField: "username",
          as: "tweet_data"
        }
      },
      {
        $unwind: {
          path: "$tweet_data",
          preserveNullAndEmptyArrays: true
        }
      }
    ],
    function(err, foundTweet) {
      if (err) {
        console.log(err);
      }
      foundTweet.sort(function(a, b) {
        return b.tweet_data.timestamp - a.tweet_data.timestamp;
      });
      res.send({
        foundTweet
      });
    }
  );
};
exports.getUserTweet = (req, res) => {
  User.aggregate(
    [
      { $match: { username: req.params.username } },
      {
        $lookup: {
          from: "tweets",
          localField: "username",
          foreignField: "username",
          as: "tweet_data"
        }
      },
      {
        $unwind: {
          path: "$tweet_data",
          preserveNullAndEmptyArrays: true
        }
      }
    ],
    function(err, foundTweet) {
      if (err) {
        console.log(err);
      }
      foundTweet.sort(function(a, b) {
        return b.tweet_data.timestamp - a.tweet_data.timestamp;
      });
      res.send({
        foundTweet
      });
    }
  );
};
exports.getUser = (req, res) => {
  User.aggregate([{ $match: { username: req.params.username } }], function(
    err,
    foundUser
  ) {
    if (err) {
      console.log(err);
    }
    res.send({
      foundUser
    });
  });
};
exports.postTweet = (req, res, next) => {
  // Get authentication token
  let token = req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    // Verifying if token is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Invalid token return error message
        return res.status(406).json("Token is not valid");
      } else {
        // TODO: Data validator
        //Creating new tweet data
        let tweet = new Tweet();
        // Adding new tweet to mongodb

        User.findOne(
          {
            username: decoded.username
          },
          function(err, user) {
            tweet.username = user.username;
            tweet.name = user.profile.name;
            tweet.timestamp = new Date();
            tweet.content = req.body.tweet;
            if (!_.isEmpty(req.file)) {
              switch (req.file.mimetype) {
                case "image/gif":
                case "image/png":
                case "image/jpeg":
                  tweet.img.filename = req.file.filename;
                  break;
                default:
                  res.status(406).json("Invalid file");
                  break;
              }
            }
            tweet.save(function(err, t) {
              if (err) {
                res.status(400).json("Unable to save tweet");
                return;
              } else {
                res.send(t);
                return;
              }
            });
          }
        );
      }
    });
  } else {
    res.status(401).json("Not authorize");
    return;
  }
};
exports.deleteTweet = (req, res, next) => {
  const response = authentication.verifyToken(req.headers["authorization"]);
  if (response && response.username) {
    Tweet.deleteOne({ _id: req.body.id }, function(err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  } else {
    res.send("cannot delete tweet");
  }
};
