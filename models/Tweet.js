const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  name: String,
  timestamp: Date,
  content: String,
  retweets: {
    type: String,
    default: 0
  },
  likes: [
    {
      user_id: String
    }
  ],
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
