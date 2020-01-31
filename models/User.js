const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
