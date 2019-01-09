var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
  teamID: Number,
  temp: Number
});

module.exports = mongoose.model('temperature', EmployeeSchema);
