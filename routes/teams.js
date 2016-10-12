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

/* GET delete page */
router.get('/delete/:id', function(req, res, next) {
    // get the id parameter from the url
    var id = req.params.id;

    // run the delete
    Team.remove( {
        _id: id
    }, function(err) {
        if (err) {
            console.log(err);
            res.render('/error');
        }
        else {
            res.redirect('/teams');
        }
    });
});

/* GET edit team page with id parameter */
router.get('/:id', function(req, res, next) {

    // look up the selected team
    var id = req.params.id;

    Team.findById(id, function(err, team) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load edit team view
            res.render('edit-team', {
                title: 'Team Details',
                team: team
            });
        }
    });
});

/* POST - save an update */
router.post('/:id', function(req, res, next) {
   // get the id from the url
    var id = req.params.id;

    // create a new team object and populate it from the form values
    var team = new Team({
       _id: id,
        city: req.body.city,
        nickname: req.body.nickname,
        wins: req.body.wins,
        losses: req.body.losses
    });

    // try the update
    Team.update({ _id: id }, team, function(err) {
        if (err) {
            console.log(err);
            res.render('/error');
        }
        else {
            res.redirect('/teams');
        }
    });
});

// make public
module.exports = router;
