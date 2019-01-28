var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/index.js');
var bookingRouter = require('./resources/bookingRouter.js');

var app = express();

app.use(bodyParser.json());

app.get('/loaderio-2acfcb2523777999e1fe9195f44d59c9', (req, res) => {
  res.send('loaderio-2acfcb2523777999e1fe9195f44d59c9');
});

app.use('/:id', express.static(__dirname + '/../client/dist'));

app.use('/', bookingRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the BillionaireBNB DB RESTful API!' });
});


module.exports = app;
