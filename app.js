require("dotenv").config();
const express =       require('express');
const bodyParser =    require('body-parser');
const ejs =           require('ejs');
const mongoose =      require('mongoose');
const chalk =         require('chalk');


const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("home");
});

app.listen(3000, () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), process.env.SERVER_PORT, process.env.MODE);
  console.log('  Press CTRL-C to stop\n');
});
