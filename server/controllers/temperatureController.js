var mongoose = require("mongoose");
var temperature = require("../models/temperature");

var temperatureController = {};

// Show list of temperatures
temperatureController.list = function(req, res) {
  temperature.find({}).exec(function (err, temperatures) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(temperatures);
    }
  });
};

// Show temperature by id
temperatureController.show = function(req, res) {
  temperature.findOne({_id: req.params.id}).exec(function (err, temperature) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(temperature);
    }
  });
};

// Create new temperature
// temperatureController.create = function(req, res) {
//   res.send("../views/temperatures/create");
// };

// Save new temperature
temperatureController.save = function(req, res) {
  var temperature = new temperature(req.body);

  temperature.save(function(err,data) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an temperature.");
      res.send(data)
    }
  });
};

// Edit an temperature
temperatureController.edit = function(req, res) {
  temperature.findOne({teamID: req.params.teamID}).exec(function (err, temperature) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(temperature);
    }
  });
};

// Update an temperature
temperatureController.update = function(req, res) {
  temperature.findByIdAndUpdate(req.params._id, { $set: { temp: req.body.temp}}, { new: true }, function (err, temperature) {
    if (err) {
      console.log(err);
      res.send("error");
    }
    res.send(temperature);
  });
};

// Delete an temperature
temperatureController.delete = function(req, res) {
  temperature.remove({_id: req.params.id}, function(err,data) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("temperature deleted!");
      res.send(data);
    }
  });
};

module.exports = temperatureController;
