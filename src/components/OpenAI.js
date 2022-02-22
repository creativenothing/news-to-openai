import { useState } from "react"
import TweetModal from "./TweetModal"

import { ReactComponent as Twitter } from "../assets/img/twitter.svg"
import { ReactComponent as Edit } from "../assets/img/edit-2.svg"

import axios from "axios"

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

const OpenAI = props => {
	const [showModal, setShowModal] = useState(false)
	const [tweet, setTweet] = useState("")

	const { seed, choices } = props

	const handleClick = choice => {
		setTweet(choice)
		setShowModal(true)
	}

	const handleUpdate = e => {
		console.log(e.target)
		setTweet(e.target.value)
	}

	const postToTwitter = () => {
		setShowModal(false)
	}
	return (
		<div className="openai">
			<article>{seed}</article>
			<ul className="list-scroll">
				{choices.map((c, i) => (
					<li key={i} style={{ color: dark ? "#bbc6ce" : "#415462" }}>
						<p>{c.text}</p>
						<div>
							<Twitter onClick={postToTwitter} />
							<Edit onClick={() => handleClick(c.text)} />
						</div>
					</li>
				))}
			</ul>
			<TweetModal
				isOpen={showModal}
				toggleModal={setShowModal}
				tweet={tweet}
				setTweet={setTweet}
				postToTwitter={postToTwitter}
			/>
		</div>
	)
}

export default OpenAI
export { fetchOpenAI }
