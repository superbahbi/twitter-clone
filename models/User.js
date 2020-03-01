const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  username: { type: String, unique: true },
  password: String,
  tweets: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  profile: {
    name: String,
    email: String,
    bio: String,
    gender: String,
    phone: String,
    birthday: Number,
    location: String,
    website: String,
    regDate: Number,
    avatar: {
      filename: {
        type: String,
        default: "default.png"
      }
    },
    cover: {
      filename: {
        type: String,
        default: "default.png"
      }
    }
  }
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
module.exports = User;
