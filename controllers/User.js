const User = require('../models/User');

exports.postSignup = (req, res) => {
  console.log(req.body);
  let msgHandler = "";
  const user = new User({
    email: req.body.username,
    password: req.body.password,
    profile: {
      birthday: {
        month: req.body.month,
        day: req.body.day,
        year: req.body.year
      }
    }
  });
  console.log(user);
  user.save(function(err) {
    if (err) {
      // TODO loggin system
      console.log(err);
      msgHandler = err;
    } else {
      msgHandler = "Successfully created the account " + req.body.username;
    }

    res.render('index');
  });

}
/**
 * GET /
 * Login page.
 */
exports.getLogin = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};

exports.postLogin = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};

exports.logout = (req, res) => {
  res.render('logout', {
    title: 'Logout'
  });
};
