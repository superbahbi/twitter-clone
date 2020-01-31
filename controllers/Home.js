/**
 * GET /
 * Home page.
 */
 exports.index = (req, res) => {
   res.render('index', {
     title: 'Home'
   });
 };
 exports.home = (req, res) => {
   res.render('home', {
     title: 'Home'
   });
 };
