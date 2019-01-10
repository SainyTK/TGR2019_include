var express = require('express');
var router = express.Router();
var beaconData = require("../controllers/beaconDataController.js");

router.get('/', (req,res) => {
  res.send('Hello')
})
// Get all beaconDatas
router.get('/showData', function(req, res) {
  beaconData.list(req, res);
});

// Get single beaconData by id
router.get('/show/:id', function(req, res) {
  beaconData.show(req, res);
});


// Save beaconData
router.post('/addData', function(req, res) {
  beaconData.save(req, res);
});

// Edit beaconData
router.get('/edit/:teamID', function(req, res) {
  beaconData.edit(req, res);
});

// Edit update
router.put('/editData/:teamID', function(req, res) {
  beaconData.update(req, res);
});

// Edit update
router.delete('/delete/:teamID', function(req, res, next) {
  beaconData.delete(req, res);
});

module.exports = router;
