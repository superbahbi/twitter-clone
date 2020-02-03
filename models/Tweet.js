const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  username: String,
  name: String,
  timestamp: Date,
  content: String,
  img: {
    data: Buffer,
    contentType: String
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
