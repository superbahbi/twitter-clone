const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String,
    birthday:
    {
      month: String,
      day: Number,
      year: Number
    }
  }
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = User;
