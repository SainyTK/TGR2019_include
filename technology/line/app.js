const bodyParser = require('body-parser')
const request = require('request')
const express = require('express')

const beaconController = require('./beacon/beaconController');
const api = require('./api');

const tensorflow = require('../tensorflow');

const BOT_ID = 'Uab960a72ea0f65c6509ab7ea2fc86398';
const ACCESS_TOKEN = 'bV3o8L3VmlQ2XxIMT3b3lZMPE1mw56VUqFxAuKX8tGgxnTGxrNgD+RftUZlXdAYYKNaOfo9LxuBX2DlyjDfPwiN5rTFfNf5x+kFyX8W0XSdvRfG8TqlV72KBRxsOAICXX7ngjbDh36mUo2qgog73wQdB04t89/1O/w1cDnyilFU=';
const app = express()
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'
const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`
}

tensorflow.init();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/predict?', (req, res) => {
    const START_TEST_SET = 0;
    const PREDICT_NEXT = req.query.n;

    let result = tensorflow.testModel(START_TEST_SET, PREDICT_NEXT);
    if (result == -1) {
        console.log(`ยังไม่มีโมเดล`)
        res.send(`ยังไม่มีโมเดล`)
        return;
    }

    res.json(result);
})

// Push
app.get('/webhook', (req, res) => {
    // push block
    let msg = `Hello TESA`;
    push(msg)
    res.send(msg)
})

// Reply
app.post('/webhook', (req, res) => {
    // reply block
    let event = req.body.events[0];
    let userId = event.source.userId;
    let reply_token = event.replyToken

    console.log(userId);

    if (event.type == 'message') {
        let message = event.message.text;

        if (message == 'Admin_Mon') {
            api.getMonitor().then((res) => {
                let result = JSON.parse(res);
                console.log(result)
                let replyMsg = `รายงานสถานะปัจจุบัน
                                อุณหภูมิ = ${result.Temperature} C
                                ความชื้น = ${result.Humidity} %
                                จำนวนคนเข้า = ${result.Pin} คน
                                จำนวนคนออก = ${result.Pout} คน`
                reply(reply_token, replyMsg);
            }).catch((err) => {
                console.log(err)
            })
        } else {
            reply(reply_token, 'พูดใหม่ซิ ?');
        }
    }
    else if (event.type == 'beacon') {
        let beacon = event.beacon;
        let timeStamp = new Date();
        let beaconTO = JSON.stringify({
            beacon: {
                dateTime: timeStamp.toLocaleString(),
                status: beacon.type
            }
        })

        console.log(beaconTO)
        api.pushBeacon(beaconTO)

        reply(reply_token, 'สวัสดี เราเอง')

        switch (beacon.type) {
            case 'enter':
                beaconController.addUser(userId);
                beaconController.increasePIn(beaconCallback);
                break;
            case 'leave':
                beaconController.removeUser(userId);
                beaconController.increasePOut(beaconCallback);
                break;
        }

        postPInOut();
    }
})

postPInOut = () => {
    let now = new Date();
    let dateNow = new Date(now.getTime() - now.getTimezoneOffset() * (60000));

    let inOutTO = JSON.stringify({
        pIn: beaconController.getPIn(),
        pOut: beaconController.getPOut(),
        date: dateNow
    })

    console.log(inOutTO)
    api.putPInOut(inOutTO)
}

beaconCallback = () => {
    beaconController.currentUsers.forEach((id) => push('จำนวนคนเกิน กรุญาเชิญคนออกจากบริเวณ', id))
}

function push(msg, id = BOT_ID) {
    let body = JSON.stringify({
        // push body
        to: id,
        messages: [
            {
                type: 'text',
                text: msg
            }
        ]
    })
    // curl
    curl('push', body)
}

function reply(reply_token, msg) {
    let body = JSON.stringify({
        // reply body
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: msg
            }
        ]
    })
    // curl
    curl('reply', body)
}

function curl(method, body) {
    request.post({
        url: 'https://api.line.me/v2/bot/message/' + method,
        headers: HEADERS,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode)
    })
}

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})