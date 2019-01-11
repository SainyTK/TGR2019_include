var mongoose = require('mongoose');

var BeaconDataSchema = new mongoose.Schema({
  dateTime: Date,
  status: String
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('BeaconData', BeaconDataSchema);
