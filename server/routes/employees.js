var express = require('express');
var router = express.Router();
var employee = require("../controllers/EmployeeController.js");

// Get all employees
router.get('/showData', function(req, res) {
  employee.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function(req, res) {
  employee.show(req, res);
});

// Create employee
router.get('/create', function(req, res) {
  employee.create(req, res);
});

// Save employee
router.post('/addData', function(req, res) {
  employee.save(req, res);
});

// Edit employee
router.get('/edit/:teamID', function(req, res) {
  employee.edit(req, res);
});

// Edit update
router.put('/editData/:teamID', function(req, res) {
  employee.update(req, res);
});

// Edit update
router.delete('/delete/:teamID', function(req, res, next) {
  employee.delete(req, res);
});

module.exports = router;
