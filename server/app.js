var bodyParser = require('body-parser')
var fs = require('fs')
var express = require('express');

var app = express();
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.send("Hello express!")
})

app.get('/listUsers', (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    console.log( data );
    res.end( data );
 });
})

app.get('/showbyID/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    var users = JSON.parse( data );
    var user = users["user" + req.params.id] 
    console.log( user );
    res.end( JSON.stringify(user));
 });
})

app.post('/addUser', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     data = JSON.parse( data );
     data["user" + (Object.keys(data).length+1) ] = req.body;
     console.log( data );
     res.end( JSON.stringify(data));
  });
})

const PORT = 8080
app.listen(PORT, ()=> {
  console.log(`Server listening on ${PORT}`)
})

