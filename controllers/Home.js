/**
 * GET /
 * Home page.
 */
 exports.test = (req, res) => {
   res.send('test result');
 };
 exports.index = (req, res) => {
   res.render('index', {
     title: 'Home'
   });
 };
