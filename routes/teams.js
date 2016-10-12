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

/* GET /teams/add to show the empty form */
router.get('/add', function(req, res, next) {
    // load the blank form
    res.render('add-team', {
        title: 'Add a New Team'
    });
});

/* POST /teams/add to process the form submission */
router.post('/add', function(req, res, next) {
    // use the mongoose model to add the new record

    Team.create( {
        city: req.body.city,
        nickname: req.body.nickname,
        wins: req.body.wins,
        losses: req.body.losses
    }, function(err, Team) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        }
        else {
            // redirect to the updated teams view
            res.redirect('/teams');
        }
    });
});

// make public
module.exports = router;
