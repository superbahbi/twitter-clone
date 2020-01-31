const express     =    require('express');
const bodyParser  =    require('body-parser');
const ejs         =    require('ejs');
const mongoose    =    require('mongoose');
const chalk       =    require('chalk');
const passport    =    require('passport');
const dotenv      =    require('dotenv');

dotenv.config({ path: '.env' });

const homeController = require('./controllers/home');
const userController = require('./controllers/user');

const app = express();
/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', homeController.index);
app.get('/home', homeController.home);
app.post('/signup', userController.postSignup);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);

app.listen(3000, () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), process.env.SERVER_PORT, process.env.MODE);
  console.log('  Press CTRL-C to stop\n');
});
