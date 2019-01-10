var express = require('express');
var router = express.Router();
var beaconPeople = require("../controllers/beaconPeopleController.js");

router.get('/getAllPeople', function(req, res) {
  beaconPeople.getAllPeople(req, res);
});

router.get('/getSanam?', function(req, res) {
  beaconPeople.getSanam(req, res);
});

router.post('/addPeople', function(req, res) {
  beaconPeople.addPeople(req, res);
});

module.exports = router;
