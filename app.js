const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
/* const MongoStore = require('connect-mongo')(session); */
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet  = require('helmet');
const compression = require('compression');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');

// Database
require('./util/mongoDB')();

// Passport
require('./config/passport');

const indexRouter = require('./routes/indexRoutes');
const usersRouter = require('./routes/usersRoutes');
const adminRouter = require('./routes/adminRoutes');

const topCategory = require('./util/menu');
const footerMenu = require('./util/footer');

const app = express();

// g-zip compression middleware
app.use(compression());

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



 //Session management 
 /*
const mongoUri = require('./util/constants').createConnectionString(); */
const sessionStore = require('./util/sessionStore');
app.use(session({
  /* store: new MongoStore({
    url: mongoUri,
    collection: 'sessions',
    ttl: 14 * 24 * 60 * 60 // = 14 days. Default
  }), */
  store: sessionStore,
  secret: 'Some secret',
  httpOnly: true,
  resave: false,
  saveUninitialized: false/* ,
  rolling: true */,
  cookie: {
    secure: true,
    maxAge: 100000
  }
}));

// PassportJS 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Check if user is logged in
app.use(function(req, res, next) {
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error 404', 
    topMenu: topCategory,
    footerMenu: footerMenu,
  });
});

module.exports = app;
