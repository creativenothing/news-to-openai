const axios = require("axios")
const fs = require("fs")

const OPENAI_API_PATH =
	"https://api.openai.com/v1/engines/text-davinci-001/completions"
const OPENAI_API_KEY = process.env.REACT_APP_OPENAPI_KEY

const seed = "Marjorie Taylor Greene speaks at white nationalist event"
const createPrompt = seed =>
	'I saw a news headline today that said: "' +
	seed +
	'." So I wrote a funny tweet about it that said: '

const headers = { Authorization: "Bearer " + OPENAI_API_KEY }
const data = {
	prompt: createPrompt(seed),
	max_tokens: 100,
	temperature: 0.6,
	n: 10,
	echo: false
}

const fetchOpenAI = () => {
	return axios
		.post(OPENAI_API_PATH, data, { headers })
		.then(({ data }) => {
			const filepath = __dirname + "/../data/openairequest.json"
			fs.writeFileSync(filepath, JSON.stringify(data))
		})
		.catch(err => console.log(err))
}

fetchOpenAI()
