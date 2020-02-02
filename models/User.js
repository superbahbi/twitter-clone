const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  tweets: Number,
  tag: String,
  profile: {
    name: String,
    email: String,
    bio: String,
    gender: String,
    phone: String,
    location: String,
    website: String,
    picture: String,
    birthday: Date
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
