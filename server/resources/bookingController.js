var listings = require('./Listing.js');
var axios = require('axios');
var db = require('../db/index.js');

exports.retrieveBooking = (req, res) => {
    listings.find({_id:req.params.id}, (err, results) => {
        res.send(results);
    })
};

