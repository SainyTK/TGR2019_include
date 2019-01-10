var SensorData = require("../models/sensorData");

var sensorDataController = {};

// Show list of sensorDatas
sensorDataController.list = function(req, res) {
  SensorData.find({}).sort({_id:-1}).exec(function (err, sensorDatas) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      // var date = new Date()
      // var dateNow = date.toLocaleTimeString()
      // var dateBefore = addZero(date.getHours()-1) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds())
      // for(i in sensorDatas) {
      //   console.log(sensorDatas[i].date)
      // }
      var date = new Date()
      var dateNow = date.toLocaleString()
      var dateBefore = addZero(date.getHours()-1) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds())
      var timestampNow = Date.parse(dateNow)
      var timestampbefore = Date.parse(dateBefore)
      console.log(dateNow,dateBefore,timestampNow,timestampbefore)
      let Pin = 0
      let Pout = 0
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
