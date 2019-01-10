var SensorData = require("../models/sensorData");

var sensorDataController = {};

sensorDataController.getAllData = function(req, res) {
  SensorData.find({}).exec(function (err, SensorData) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(SensorData);
    }
  });
};

// Show list of sensorDatas
sensorDataController.list = function(req, res) {
      var now = new Date()
      var dateNow = new Date(now.getTime() - now.getTimezoneOffset() * (60000))
      var dateBefore = new Date(now.getTime() - now.getTimezoneOffset() * (51428))
  SensorData.find({ date: { $gte: dateBefore, $lt: dateNow } }).sort({_id:-1}).exec(function (err, sensorData) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      let Pin = 0
      let Pout = 0
      for(i in sensorData) {
        Pin = Pin + sensorData[i].Pin
        Pout = Pout + sensorData[i].Pout
      }
      res.send({ 
        "Temperature": sensorData[0].Temperature,
        "Humidity": sensorData[0].Humidity,
        "Pin": Pin,
        "Pout": Pout
      });
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
