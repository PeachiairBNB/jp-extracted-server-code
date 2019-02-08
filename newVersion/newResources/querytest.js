var Listings = require('../../server/resources/Listing');
var axios = require('axios');
var db = require('../../server/db/index.js');

var mongoTester = (num) => {
    console.time('finished');
    var count = 0;
    for (var i = 0; i < num; i++) {
        var randomId = Math.floor(Math.random() * 10000000);
        Listings.find({_id:randomId}, (err, results) => {
            count++;
            if (count === num) {
                console.timeEnd('finished');
            } 
        })
    }
}

mongoTester(10000);