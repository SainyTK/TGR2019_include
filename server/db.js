var mongojs = require('mongojs');

var databaseUrl = 'mongodb://localhost/hwData';
var collections = ['temperature'];
var option = {"auth": {"user": "tgr", "password": "tgr2019"} }

var connect = mongojs(databaseUrl, collections, option);

module.exports = {
    connect: connect
};