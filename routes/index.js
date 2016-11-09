var express = require('express');
var router = express.Router();

// reference the Account model
var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Lesson 9',
    message: 'Authentication with Passport OAuth Strategies',
    user: req.user
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    'title': 'Register',
    user: req.user
  });
});

/* POST register page */
router.post('/register', function(req, res, next) {
  // create a new account
  Account.register(new Account({ username: req.body.username }), req.body.password,
      function(err, account) {
        if (err) {
          console.log(err);
          res.redirect('/error');
        }
        else {
          res.redirect('/login');
        }
      }
  );
});

/* GET login page. */
router.get('/login', function(req, res, next) {

  // get any messages from session
  var messages = req.session.messages || [];

  /* the above line is shorthand for this if statement below:
  var messages;

  if (req.session.messages.length > 0 ) {
    messages = req.session.messages;
  }
  else {
    messages = [];
  } */

  // clear out the session messages so they don't still show if the user leaves and comes back
  req.session.messages = [];

  if (req.user) {
    res.redirect('/teams');
  }
  else {
    res.render('login', {
      'title': 'Login',
      messages: messages,
      user: req.user
    });
  }
});

/* POST login page. */
router.post('/login', passport.authenticate('local',
    {
      successRedirect: '/teams',
      failureRedirect: '/login',
      failureMessage: 'Invalid Login' // automatically stored in req.session.messages
    }
));

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

/* GET /facebook - show fb login popup */
router.get('/facebook', passport.authenticate('facebook'));

/* GET /facebook/callback - log the user in if valid */
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {
    res.redirect('/teams');
});

/* GET /github - show github login popup */
router.get('/github', passport.authenticate('github'));

/* GET /github/callback - log the user in if valid */
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {
  res.redirect('/teams');
});

module.exports = router;
