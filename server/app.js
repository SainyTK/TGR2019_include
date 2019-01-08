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

app.post('/addMultiUser', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     data = JSON.parse( data );
      var newUsers = req.body
     for(i in newUsers) {
      newUsers[i] = {
        "name": req.body[i].name,
        "password": req.body[i].password,
        "profession": req.body[i].profession,
        "id": Object.keys(data).length+1 
      } 
      data["user" + (Object.keys(data).length+1)] = newUsers[i]
     }
     console.log( data );
     res.end( JSON.stringify(data));
  });
})

app.delete('/deleteUser/:id', function(req, res) 
{
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    delete data["user"+ req.params.id]
    res.end(JSON.stringify(data))
  });
})


const PORT = 8080
app.listen(PORT, ()=> {
  console.log(`Server listening on ${PORT}`)
})

