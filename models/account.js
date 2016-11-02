/**
 * Created by RFreeman on 11/2/2016.
 */
var mongoose = require('mongoose');

var plm = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
   username: {
       type: String,
       required: 'Username is required'
   },
   password: {
       type: String
   }
});

// connect this model to passport local mongoose
AccountSchema.plugin(plm);

// make this class public
module.exports = mongoose.model('Account', AccountSchema);