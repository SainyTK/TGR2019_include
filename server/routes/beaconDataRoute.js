var express = require('express');
var router = express.Router();
var beaconData = require("../controllers/beaconDataController.js");

// Get all beaconDatas
router.get('/monitor', function(req, res) {
  beaconData.monitor(req, res);
});

// Save beaconData
router.post('/putSanam', function(req, res) {
  beaconData.save(req, res);
});

module.exports = router;
