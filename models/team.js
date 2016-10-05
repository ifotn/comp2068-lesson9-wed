/**
 * Created by RFreeman on 10/5/2016.
 */
// link to mongoose
var mongoose = require('mongoose');

// create a team schema to define this class
var teamSchema = new mongoose.Schema({
    city: {
        type: String,
        required: 'City cannot be blank'
    },
    nickname: {
        type: String,
        required: 'Nickname cannot be blank'
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    }
});

// make this schema public using the schema defined above
// note the public class name is singular and starts with a Capital
module.exports = mongoose.model('Team', teamSchema);