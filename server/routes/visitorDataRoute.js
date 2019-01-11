var express = require('express');
var router = express.Router();
var visitorData = require("../controllers/visitorDataController");

// Get all sensorDatas
router.get('/getSanam?', function(req, res) {
  visitorData.getSanam(req, res);
});

module.exports = router;
