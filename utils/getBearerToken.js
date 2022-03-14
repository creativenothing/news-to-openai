const axios = require("axios")
//curl -X POST "https://api.twitter.com/oauth2/token" \
//-H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" \
//-u $CONSUMER_KEY:$CONSUMER_SECRET \
//--data-urlencode "grant_type=client_credentials"

const url = "https://api.twitter.com/oauth2/token"
const auth = {
	username: process.env.CONSUMER_KEY,
	password: process.env.CONSUMER_SECRET
}

const headers = {
	Accept: "*/*",
	Connection: "close",
	"User-Agent": "node-twitter/1",
	"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}
const params = { grant_type: "client_credentials" }

const options = { headers, auth, params }
const data = {}

const getBearerToken = () =>
	axios
		.post(url, data, options)
		.then(res => res.data)
		.catch(err => console.log(err))
