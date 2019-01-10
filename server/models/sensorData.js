var mongoose = require('mongoose');

var SensorDataSchema = new mongoose.Schema({
  Temperature: Number,
  Humidity: Number,
  Pin: Number,
  Pout: Number,
  date: Date
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('sensorData', SensorDataSchema);
