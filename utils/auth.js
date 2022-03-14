const axios = require("axios")

//const request = require("request-promise-native")
//const encodeUrl = require("encodeurl")

//const options = {
//	headers: {
//		Accept: "*/*",
//		Connection: "close",
//		"User-Agent": "node-twitter/1"
//	},
//	oauth: {
//		consumer_key: process.env.CONSUMER_KEY,
//		consumer_secret: process.env.CONSUMER_SECRET,
//		callback: encodeUrl("http://localhost:5000/auth/twitter/callback")
//	},
//	url: `https://api.twitter.com/oauth/request_token`
//}
//
//request
//	.post(options)
//	.then(res => console.log(res))
//	.catch(error => console.log(error))

const headers = {
	Accept: "*/*",
	Connection: "close",
	"User-Agent": "node-twitter/1"
}

const oauth = {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	callback: "http://localhost:5000/auth/twitter/callback"
}

const url = "https://api.twitter.com/oauth/request_token"

const config = { headers }
const data = {}

axios
	.post(url, data, config, oauth)
	.then(res => console.log(res))
	.catch(error => console.log(error))
