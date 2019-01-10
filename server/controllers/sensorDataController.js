var SensorData = require("../models/sensorData");

var sensorDataController = {};

// Show list of sensorDatas
sensorDataController.list = function(req, res) {
  SensorData.find({}).exec(function (err, sensorDatas) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(sensorDatas);
    }
  });
};

// Show sensorData by id
sensorDataController.show = function(req, res) {
  SensorData.findOne({_id: req.params.id}).exec(function (err, sensorData) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(sensorData);
    }
  });
};

// Save new sensorData
sensorDataController.save = function(req, res) {
  var sensorData = new SensorData(req.body);

  sensorData.save(function(err,data) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an sensorData.");
      res.send(data)
    }
  });
};

// Edit an sensorData
sensorDataController.edit = function(req, res) {
  SensorData.findOne({teamID: req.params.teamID}).exec(function (err, sensorData) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(sensorData);
    }
  });
};

// Update an sensorData
sensorDataController.update = function(req, res) {
  SensorData.findByIdAndUpdate(req.params._id, { $set: { temp: req.body.temp}}, { new: true }, function (err, sensorData) {
    if (err) {
      console.log(err);
      res.send("error");
    }
    res.send(sensorData);
  });
};

// Delete an sensorData
sensorDataController.delete = function(req, res) {
  SensorData.remove({_id: req.params.id}, function(err,data) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("sensorData deleted!");
      res.send(data);
    }
  });
};

module.exports = sensorDataController;
