var express = require('express');
var router = express.Router();
var temperature = require("../controllers/temperatureController.js");

// Get all temperatures
router.get('/showData', function(req, res) {
  temperature.list(req, res);
});

// Get single temperature by id
router.get('/show/:id', function(req, res) {
  temperature.show(req, res);
});


// Save temperature
router.post('/addData', function(req, res) {
  temperature.save(req, res);
});

// Edit temperature
router.get('/edit/:teamID', function(req, res) {
  temperature.edit(req, res);
});

// Edit update
router.put('/editData/:teamID', function(req, res) {
  temperature.update(req, res);
});

// Edit update
router.delete('/delete/:teamID', function(req, res, next) {
  temperature.delete(req, res);
});

module.exports = router;
