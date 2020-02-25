const jwt = require("jsonwebtoken");
var authentication = {
  verifyToken: function(token) {
    if (token) {
      if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length).trimLeft();
      }
      // Verifying and return data if token is valid
      return jwt.verify(token, process.env.JWT_SECRET);
    } else {
      return false;
    }
  },
  warning: function(warning) {
    console.log("Warning: " + warning);
  },
  error: function(error) {
    console.log("Error: " + error);
  }
};

module.exports = authentication;
