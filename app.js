var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Users = require('./models/users');
var Articles = require('./models/articles');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var apiUsersRouter = require('./routes/api/users');
var apiArticlesRouter = require('./routes/api/articles');
var apiAuthRouter = require('./routes/api/auth');
var authRouter = require('./routes/auth');

var app = express();

var config = require('./config.dev');

//Test the file
//console.log(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  //Define the session store
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  //Set the secret
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    domain: config.cookie.domain,
    //httpOnly: true,
    //secure: true,
    maxAge: 3600000 //1 hour
  }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(Users.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, {
    id: user._id,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name
  });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

//Session-based access control
app.use(function (req, res, next) {
  //Uncomment the following line to allow access to everything.
  //return next();

  //Allow any endpoint that is an exact match. The server does not
  //have access to the hash so /auth and /auth#xxx would bot be considered 
  //exact matches.
  var whitelist = ['/', '/auth', '/articles'];

  //req.url holds the current URL
  //indexOf() returns the index of the matching array element
  //-1, in this context means not found in the array
  //so if NOT -1 means is found in the whitelist
  //return next(); stops execution and grants access
  if (whitelist.indexOf(req.url) !== -1) {
    return next();
  }

  //Allow access to dynamic endpoints
  var subs = ['/public/','/api/auth/','/api/articles/'];

  //The query string provides a partial URL match beginning
  //at position 0. Both /api/auth/login and /api/auth/logout would would 
  //be considered a match for /api/auth/
  for (var sub of subs) {
    if (req.url.substring(0, sub.length) === sub) {
      return next();
    }
  }

  //There is an active user session, allow access to all endpoints.
  if (req.isAuthenticated()) {
    return next();
  }

  //There is no session nor are there any whitelist matches. Deny access and
  //Redirect the user to the login screen.
  return res.redirect('/auth#login');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/users', apiUsersRouter);
app.use('/articles', articlesRouter);
app.use('/api/articles', apiArticlesRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Connect to MongoDB
mongoose.connect(config.mongodb, { useNewUrlParser: true });

module.exports = app;
