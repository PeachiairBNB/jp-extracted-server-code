var mongoose = require('mongoose');

// var availabilitySchema = mongoose.Schema({
//     id: Number,
//     date: Date,
//     status: Boolean,
//     price: Number
// }, { _id: false });

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
// var Availability = mongoose.model('availability', availabilitySchema);

module.exports = listings; 
