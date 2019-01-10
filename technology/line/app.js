const bodyParser = require('body-parser')
const request = require('request')
const express = require('express')

const beaconController = require('./beacon/beaconController');
const dateFormat = require('./date-format');
const api = require('./api');

const tensorflow = require('../tensorflow');

const app = express()
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'
const HEADERS = {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer bV3o8L3VmlQ2XxIMT3b3lZMPE1mw56VUqFxAuKX8tGgxnTGxrNgD+RftUZlXdAYYKNaOfo9LxuBX2DlyjDfPwiN5rTFfNf5x+kFyX8W0XSdvRfG8TqlV72KBRxsOAICXX7ngjbDh36mUo2qgog73wQdB04t89/1O/w1cDnyilFU='
}

tensorflow.init();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/predict?', (req, res) => {
    const START_TEST_SET = 0;
    const PREDICT_NEXT = req.query.n;

    let result = tensorflow.testModel(START_TEST_SET, PREDICT_NEXT);
    if(result == -1) {
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
    let reply_token = event.replyToken

    if (event.type == 'message') {
        let message = event.message;

        if (message == 'Admin_Mon') {

        }
    }
    else if (event.type == 'beacon') {
        let beacon = event.beacon;

        let beaconTO = JSON.stringify({
            beacon: {
                dateTime: dateFormat.parse(new Date()),
                status: beacon.type
            } 
        })

        console.log(beaconTO)
        api.pushBeacon(beaconTO)

        reply(reply_token, 'สวัสดี เราเอง')

        switch (beacon.type) {
            case 'enter' :
                beaconController.increasePIn((pCurrent) => {
                    console.log(pCurrent)
                    // push('จำนวนคนเกิน กรุญาเชิญคนออกจากบริเวณ')
                    reply(reply_token, 'จำนวนคนเกิน กรุญาเชิญคนออกจากบริเวณ')
                });
                break;
            case 'leave' :
                beaconController.increasePOut((pCurrent) => {
                    console.log(pCurrent)
                    // push('จำนวนคนเกิน กรุญาเชิญคนออกจากบริเวณ')
                    reply(reply_token, 'จำนวนคนเกิน กรุญาเชิญคนออกจากบริเวณ')
                });
                break;
        }
    }
})

function push(msg) {
	let body = JSON.stringify({
	// push body
	to: 'Uab960a72ea0f65c6509ab7ea2fc86398',
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