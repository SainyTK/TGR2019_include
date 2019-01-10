var mongoose = require('mongoose');

var BeaconPeopleSchema = new mongoose.Schema({
  Pin: Number,
  Pout: Number,
  date: Date,
  hours: String
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('beaconPeople', BeaconPeopleSchema);
