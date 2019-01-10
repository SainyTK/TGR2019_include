var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//var option = { "auth": { "user": "tgr","password": "tgr2019" }, useNewUrlParser: true }

mongoose.connect('mongodb://localhost/serverDatabase', options)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var sensorData = require('./routes/sensorData');
var beaconData = require('./routes/beaconDataRoute');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/sensorData', sensorData);
app.use('/beaconData', beaconData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = 8000
app.listen(port, console.log(`Server listening on ${ port }`))
