var express = require('express');
var request = require('request');
var router = express.Router();

const accessToken = 'bV3o8L3VmlQ2XxIMT3b3lZMPE1mw56VUqFxAuKX8tGgxnTGxrNgD+RftUZlXdAYYKNaOfo9LxuBX2DlyjDfPwiN5rTFfNf5x+kFyX8W0XSdvRfG8TqlV72KBRxsOAICXX7ngjbDh36mUo2qgog73wQdB04t89/1O/w1cDnyilFU=';
const HEADERS = {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${accessToken}`
}

// Push
router.get('/webhook', (req, res) => {
	// push block
	let msg = 'Hello World!'
	push(msg)
	res.send(msg)
})

// Reply
router.post('/webhook', (req, res) => {
	// reply block
	console.log(req.body);
	let reply_token = req.body.events[0].replyToken
	// let msg = req.body.events[0].message.text
	reply(reply_token, JSON.stringify(req.body))
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
	curl('reply', body);
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

module.exports = router;
