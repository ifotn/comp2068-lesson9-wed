var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
// add the teams controller
var teams = require('./routes/teams');

var app = express();

// connect to mongodb with mongoose
var mongoose = require('mongoose');

// link to global vars file
var config = require('./config/globalVars');
mongoose.connect(config.db);

// passport config - add dependencies
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
app.use(flash());

// enable sessions
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// link to the Account model which we build
var Account = require('./models/account');
passport.use(Account.createStrategy());

// add facebook auth
var facebookStrategy = require('passport-facebook').Strategy;

// configure facebook auth
passport.use(new facebookStrategy({
  clientID: config.ids.facebook.clientID,
  clientSecret: config.ids.facebook.clientSecret,
  callbackURL: config.ids.facebook.callbackURL
}, function(accessToken, refreshToken, profile, cb) {

      Account.findOne({ oauthID: profile.id }, function(err, user) {
        if (err) {
          console.log(err);
        }
        else {
          if (!err && user != null) { // fb user already exists in our db
            cb(null,  user);
          }
          else {
            // create a new user from the fb profile
            user = new Account({
              oauthID: profile.id,
              username: profile.displayName,
              created: Date.now()
            });

            user.save(function(err, user) {
              if (err) {
                console.log(err);
              }
              else {
                cb(null, user);
              }
            });
          }
        }
      });
      /*Account.findOrCreate({ facebookId: profile.id }, function(err, user) {
        return cb(err, user);
      });*/
    }
));

// add facebook auth
var githubStrategy = require('passport-github').Strategy;

// configure facebook auth
passport.use(new githubStrategy({
      clientID: config.ids.github.clientID,
      clientSecret: config.ids.github.clientSecret,
      callbackURL: config.ids.github.callbackURL
    }, function(accessToken, refreshToken, profile, cb) {

      Account.findOne({ oauthID: profile.id }, function(err, user) {
        if (err) {
          console.log(err);
        }
        else {
          if (!err && user != null) { // github user already exists in our db
            cb(null,  user);
          }
          else {
            // create a new user from the github profile
            user = new Account({
              oauthID: profile.id,
              username: profile.username, // github uses "username" not "displayName" like fb
              created: Date.now()
            });

            user.save(function(err, user) {
              if (err) {
                console.log(err);
              }
              else {
                cb(null, user);
              }
            });
          }
        }
      });
    }
));

// read and write the user to / from the session
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
// add url mapping for the teams section
app.use('/teams', teams);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
