var mongoose = require('mongoose');
var location = process.env.MONGO_URI || 'localhost' || 'mongo:27017';
var mongoUri = `mongodb://${location}/listings`;

var db = mongoose.connect(mongoUri, { useNewUrlParser: true } );

db.connection = mongoose.connection;

module.exports = db;