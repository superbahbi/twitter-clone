const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  username: String,
  name: String,
  timestamp: Date,
  content: String,
  retweets: {
    type: String,
    default: 0
  },
  likes: {
    type: String,
    default: 0
  },
  img: {
    filename: String
  },
  comment: [
    {
      user_id: String,
      timestamp: Date,
      content: String,
      img: {
        filename: String
      }
    }
  ]
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
