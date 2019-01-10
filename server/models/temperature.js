var mongoose = require('mongoose');

var temperatureSchema = new mongoose.Schema({
  teamID: Number,
  temp: Number
});

module.exports = mongoose.model('temperature', temperatureSchema);
