var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('./db');

var db = mongojs.connect;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.send("Sample Code for RESTful API");
})

//Get all user
app.get('/showData', function (req, res) {
  db.temperature.find(function (err, docs) {
    console.log(docs);
    res.send(docs);
  });

})

//Get user by ID
app.get('/user/:id', function (req, res) {
  var id = parseInt(req.params.id);

  db.temperature.findOne({
    id: id
  }, function (err, docs) {
    if (docs != null) {
      console.log('found', JSON.stringify(docs));
      res.json(docs);
    } else {
      res.send('User not found');
    }
  });
})

//Update user by ID in body
app.put('/editData/:teamID', function (req, res) {
  console.log('Get from Api', req.body);
  db.temperature.findAndModify({
    query: {
      teamID: req.params.teamID
    },
    update: {
      $set: req.body
    }
  }, function (err, docs) {
    console.log('Update Done');
    res.send("update successful");
  });
})

//Add user
app.post('/addData', function (req, res) {
  var json = req.body;
  console.log(json)
  db.temperature.insert(json, function (err, docs) {
    console.log(docs);
    res.send(docs);
  });


})

//Delete user by ID
app.delete('/deleteData/:teamID', function (req, res) {
  var id = req.params.teamID
  db.temperature.remove({
    teamID: id
  }, function (err, docs) {
    console.log(docs);
    res.send(docs);
  });
})

var server = app.listen(8080, function () {
  var port = server.address().port

  console.log("Sample Code for RESTful API run at ", port)
})