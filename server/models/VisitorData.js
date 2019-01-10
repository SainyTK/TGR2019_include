var mongoose = require('mongoose');

var VisitorDataScheme = new mongoose.Schema({
  day: Date,
  values: Array
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('visitorData', SensorDataSchema);
