var listings = require('./Listing.js');
var axios = require('axios');
var db = require('../db/index.js'); // mongo database

// mongo function

exports.retrieveBooking = (req, res) => {
    var data;
    listings.find({_id:req.params.id}, (err, results) => {
        data = results;
        res.send(data);
    })
};

