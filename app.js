const express     =    require('express');
const path        =    require('path');
const dotenv      =    require('dotenv');
const bodyParser  =    require('body-parser');
const ejs         =    require('ejs');
const mongoose    =    require('mongoose');
const chalk       =    require('chalk');
const flash       =    require('express-flash');
const session     =    require('express-session');
const passport    =    require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const MongoStore = require('connect-mongo')(session);
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


dotenv.config({ path: '.env' });

const homeController = require(__dirname + '/controllers/home');
const userController = require(__dirname + '/controllers/user');
const tweetController = require(__dirname + '/controllers/tweet');
const functionController = require(__dirname + '/models/function');
const app = express();

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());

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

app.use(flash());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/moment/min'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));

app.get('/', homeController.index);
app.get('/home', functionController.isAuthenticated, userController.home);
app.post('/signup', userController.postSignup);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/:profile', functionController.isAuthenticated, userController.profile);
app.post('/tweet', functionController.isAuthenticated, upload.single('img'), tweetController.tweet);
app.post('/editprofile', functionController.isAuthenticated,userController.editprofile);
app.post('/upload/photo', functionController.isAuthenticated, upload.single('upload-img'), userController.upload);
app.get('/test', homeController.test);

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), process.env.SERVER_PORT, process.env.MODE);
  console.log('  Press CTRL-C to stop\n');
});
