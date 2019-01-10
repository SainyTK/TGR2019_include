const request = require('request');
const apiServer = 'http://202.139.192.105:80';
const apiLocal = 'http://192.168.71.33:80';

const api = apiLocal;

const HEADER = {
    'Content-Type': 'application/json',
}

function pushBeacon(data) {
    request.post({
        url: `${api}/putSanam`,
        body: data,
        headers: HEADER
    }, (err, res, body) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('Post Success')
    })
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

module.exports = {
    pushBeacon,
    getMonitor
}