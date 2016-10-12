var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Lesson 6',
    message: 'Starting CRUD with MongoDB - Part 2'
  });
});

module.exports = router;
