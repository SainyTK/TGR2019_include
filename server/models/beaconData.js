var mongoose = require('mongoose');

var BeaconDataSchema = new mongoose.Schema({
  Pin: Number,
  Pout: Number,
  timestamp: Date
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('BeaconData', BeaconDataSchema);
