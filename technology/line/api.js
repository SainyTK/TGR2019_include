const request = require('request');
const apiServer = 'http://202.139.192.105:80';
const apiLocal = 'http://192.168.71.33:80';

const api = apiServer;

const HEADER = {
    'Content-Type': 'application/json',
}

function putPInOut(data) {
    curl('putPInOut', data)
}

function pushBeacon(data) {
    curl('putSanam', data)
}

function getMonitor() {
    return new Promise((resolve, reject) => {
        request.get({
            url: `${api}/showSensorData`,
            headers: HEADER
        }, (err, res, body) => {
            console.log(res.body)
            if (err) reject
            resolve(res.body)
        })
    })
}

function curl(method, data) {
    request.post({
        url: `${api}/${method}`,
        body: data,
        headers: HEADER
    }, (err, res, body) => {
        if (err) {
            console.log(err)
            return;
        }
    })
}

module.exports = {
    putPInOut,
    pushBeacon,
    getMonitor
}