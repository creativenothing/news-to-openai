const axios = require("axios")

const dark = window.matchMedia("(prefers-color-scheme: dark)").matches

const OPENAI_API_PATH =
	"https://api.openai.com/v1/engines/text-davinci-001/completions"

const data = {
	max_tokens: 100,
	temperature: 0.6,
	n: 10,
	echo: false
}

const headers = {
	"Content-Type": "application/json",
	Authorization: "Bearer " + process.env.REACT_APP_OPENAPI_KEY
}
const config = { headers }

const fetchOpenAI = seed => {
	const twitterPrompt =
		'I saw a news headline today that said: "' +
		seed +
		'." So I wrote a funny tweet about it that said: '
	return axios
		.post(OPENAI_API_PATH, { prompt: twitterPrompt, ...data }, config)
		.then(res => {
			return res
		})
		.catch(error => ({ data: null, error }))
}
const OpenAIList = props => {
	const { choices } = props
	return (
		<ul
			className="list"
			style={{
				overflow: "auto"
			}}
		>
			{choices.map((c, i) => (
				<li
					className="listitem"
					key={i}
					style={{ minHeight: "5em", color: dark ? "#bbc6ce" : "#415462" }}
					onClick={e => console.log(e.target.innerText)}
				>
					{c.text}
				</li>
			))}
		</ul>
	)
}
const OpenAI = props => {
	const { seed, choices } = props
	return (
		<div>
			<article>{seed}</article>
			<OpenAIList choices={choices} />
		</div>
	)
}

export default OpenAI
export { fetchOpenAI }
