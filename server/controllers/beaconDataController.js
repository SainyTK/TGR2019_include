var BeaconData = require("../models/beaconData");

var beaconDataController = {};

// Show list of beaconDatas
beaconDataController.list = function(req, res) {
  BeaconData.find({}).exec(function (err, beaconDatas) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(beaconDatas);
    }
  });
};

// Show beaconData by id
beaconDataController.show = function(req, res) {
  BeaconData.findOne({_id: req.params.id}).exec(function (err, beaconData) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(beaconData);
    }
  });
};

// Save new beaconData
beaconDataController.save = function(req, res) {
  var beaconData = new BeaconData(req.body);

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
