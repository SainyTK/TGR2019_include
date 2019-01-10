var express = require('express');
var router = express.Router();
var sensorData = require("../controllers/sensorDataController.js");

router.get('/', (req,res) => {
  res.send('Hello')
})
// Get all sensorDatas
router.get('/showData', function(req, res) {
  sensorData.list(req, res);
});

// Get single sensorData by id
router.get('/show/:id', function(req, res) {
  sensorData.show(req, res);
});


// Save sensorData
router.post('/addData', function(req, res) {
  sensorData.save(req, res);
});

// Edit sensorData
router.get('/edit/:teamID', function(req, res) {
  sensorData.edit(req, res);
});

// Edit update
router.put('/editData/:teamID', function(req, res) {
  sensorData.update(req, res);
});

// Edit update
router.delete('/delete/:teamID', function(req, res, next) {
  sensorData.delete(req, res);
});

module.exports = router;
