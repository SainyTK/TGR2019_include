var BeaconPeople = require("../models/beaconPeople");

var beaconPeopleController = {};

// Show list of BeaconPeoples
beaconPeopleController.getAllPeople = function(req, res) {
  BeaconPeople.find({}).exec(function (err, beaconPeople) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(beaconPeople);
    }
  });
};

// Show BeaconPeople by id
beaconPeopleController.getSanam = function(req, res) {
  BeaconPeople.find({}).sort({_id:-1}).limit(parseInt(req.query.hours)).exec(function (err, beaconPeople) {
  //BeaconPeople.find({ hours: req.query.hours }).exec(function (err, beaconPeople) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      var number_of_tourists = []
      for(i in beaconPeople) {
        number_of_tourists.push(beaconPeople[i].Pin)
      }
      res.send({ number_of_tourists : number_of_tourists });
    }
  });
};

// Save new BeaconPeople
beaconPeopleController.addPeople = function(req, res) {

  var beaconPeople = new BeaconPeople(req.body);

  beaconPeople.save(function(err,data) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an BeaconPeople.");
      res.send(data)
    }
  });
};

// Edit an BeaconPeople
beaconPeopleController.edit = function(req, res) {
  BeaconPeople.findOne({teamID: req.params.teamID}).exec(function (err, beaconPeople) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(beaconPeople);
    }
  });
};

// Update an BeaconPeople
beaconPeopleController.update = function(req, res) {
  BeaconPeople.findByIdAndUpdate(req.params._id, { $set: { temp: req.body.temp}}, { new: true }, function (err, beaconPeople) {
    if (err) {
      console.log(err);
      res.send("error");
    }
    res.send(beaconPeople);
  });
};

// Delete an BeaconPeople
beaconPeopleController.delete = function(req, res) {
  BeaconPeople.remove({_id: req.params.id}, function(err,data) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("beaconPeople deleted!");
      res.send(data);
    }
  });
};

module.exports = beaconPeopleController;
