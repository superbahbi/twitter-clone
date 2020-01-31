exports.postSignup =  (req, res) => {
  res.render('signup');
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
