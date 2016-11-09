/**
 * Created by RFreeman on 10/5/2016.
 */

// set up a global object to hold variables
// start with the db connection string
module.exports = {
    db: 'mongodb://localhost/comp2068',
    secret: 'It is take your grade 9 to work day',
    ids: {
        facebook: {
            clientID: '1676965605948770',
            clientSecret: '7fe069d1d48cb3cafb828b2fda6f363a',
            callbackURL: 'http://localhost:3000/facebook/callback'
        },
        github: {
            clientID: '55c48578ae2f38140da2',
            clientSecret: '398f677e8d028b3d7d679b09c6ca9a139a1939f4',
            callbackURL: 'http://localhost:3000/github/callback'
        }
    }
    //db: 'mongodb://gcrfreeman2:pass@ds048319.mlab.com:48319/comp2068-wed'
};