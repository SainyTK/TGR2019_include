const request = require('request');
const api = 'http://202.139.192.105:80';
const apiLocal = 'http://192.168.71.33:80';

const HEADER = {
    'Content-Type': 'application/json',
}

function pushBeacon(data) {
    request.post({
        url: `${api}/beaconData/addData`,
        body: data,
        headers: HEADER
    }, (err, res, body) => {
        if(err) {
            console.log(err)
            return;
        }
        console.log('Post Success')
    })
}

function getMonitor() {
    request.get({
        url: `${api}/beaconData/addData`,
        body: data,
        headers: HEADER
    }, (err, res, body) => {
        if(err) {
            console.log(err)
            return;
        }
        console.log('Post Success')
    })
}

module.exports = {
    pushBeacon: pushBeacon
}