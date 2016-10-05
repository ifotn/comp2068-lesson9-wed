/**
 * Created by RFreeman on 10/5/2016.
 */
// use express routing
var express = require('express');
var router = express.Router();

// link to the Team model
var Team = require('../models/team');

// GET teams home page - show list of teams
router.get('/', function(req, res, next) {
    // use Team model to get the list of teams from MongoDB
    Team.find(function(err, teams) {
       if (err) {
           console.log(err);
           res.redirect('error');
       }
        else {
           // load teams.ejs view
           res.render('teams', {
               title: 'Playoff Teams',
               teams: teams
           })
       }
    });
});

// make public
module.exports = router;
