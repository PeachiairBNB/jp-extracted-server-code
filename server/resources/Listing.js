var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
    _id: Number,
    id: Number,
    name: String,
    capacity: Number,
    cleaningFee: Number, 
    numReviews: Number,
    price: Number,
    availability: String
}, { _id: true });

var listings = mongoose.model('listings', listingSchema);

module.exports = listings; 
