const User = require("../models/User");
const Tweet = require("../models/Tweet");
const moment = require("moment");
/**
 * GET /
 * Home page.
 */
exports.test = (req, res) => {
  res.send("test result");
};
exports.index = (req, res) => {
  if (req.isAuthenticated()) {
    User.findOne(
      {
        username: req.user.username
      },
      function(err, user) {
        if (err) {
          req.flash("error", "Could not find any user");
          res.redirect("/home");
        } else {
          foundUser = user;
          Tweet.aggregate(
            [
              {
                $lookup: {
                  from: "users",
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
              },
              {
                $sort: { timestamp: -1 }
              }
            ],
            function(err, foundTweet) {
              if (err) {
                console.log(err);
              }
              res.render("home", {
                foundTweet,
                foundUser,
                moment
              });
            }
          );
        }
      }
    );
  } else {
    res.render("index", {
      title: "Home"
    });
  }
};
