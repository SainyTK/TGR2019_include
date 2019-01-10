var BeaconData = require("../models/beaconData");
var file = require('../utils/fileUtils');

var beaconDataController = {};

// Show list of beaconDatas
beaconDataController.monitor = async function(req, res) {
  BeaconData.find({}).exec(function (err, beaconDatas) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(beaconDatas);
    }
  });
};

// Save new beaconData
beaconDataController.save = function(req, res) {
var data = {
    dateTime: req.body.beacon.dateTime.toString(),
    status: req.body.beacon.status.toString()
}
  console.log(req.body.beacon.dateTime)
  var beaconData = new BeaconData(data);

  beaconData.save(function(err,data) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an beaconData.");
      res.send(data)
    }
  });
};

// Edit an beaconData
beaconDataController.edit = function(req, res) {
  BeaconData.findOne({teamID: req.params.teamID}).exec(function (err, beaconData) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(beaconData);
    }
  });
};

// Update an beaconData
beaconDataController.update = function(req, res) {
  BeaconData.findByIdAndUpdate(req.params._id, { $set: { temp: req.body.temp}}, { new: true }, function (err, beaconData) {
    if (err) {
      console.log(err);
      res.send("error");
    }
    res.send(beaconData);
  });
};

// Delete an beaconData
beaconDataController.delete = function(req, res) {
  BeaconData.remove({_id: req.params.id}, function(err,data) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("beaconData deleted!");
      res.send(data);
    }
  });
};

module.exports = beaconDataController;
