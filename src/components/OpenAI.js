import { Fragment, useState } from "react"
import TweetModal from "./TweetModal"
import { HeadLine, findElapsedTime } from "./News/Headlines.js"

import { ReactComponent as Twitter } from "../assets/img/twitter.svg"
import { ReactComponent as Edit } from "../assets/img/edit-2.svg"
import openairequest from "../data/openairequest"
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
		.then(res => res)
		.catch(error => ({ data: null, error }))
}

const OpenAIHeadline = props => {
	const { article, sendSeed, newslist } = props
	return (
		<div className="headline" style={{ color: dark ? "#bbc6ce" : "#415462" }}>
			<div className="main">
				<div>
					<h6>{article.source.name}</h6>
					<p>{article.title}</p>
				</div>
			</div>
			<div className="info">
				<small>{findElapsedTime(article.publishedAt)}</small>
			</div>
		</div>
	)
}

const OpenAI = props => {
	const [showModal, setShowModal] = useState(false)
	const [tweet, setTweet] = useState("")
	const [index, setIndex] = useState(null)
	const { article, choices, removeFromChoices } = props

	const openTweetDetail = index => {
		const choice = choices.find(c => c.index === index)
		setTweet(choice.text)
		setIndex(choice.index)
		setShowModal(true)
	}

	const handleUpdate = e => {
		setTweet(e.target.value)
	}

	const postToTwitter = tweet => {
		alert("You posted to twitter:\n\n" + tweet)
		setShowModal(false)
	}

	return (
		<Fragment>
			{choices.map((c, i) => (
				<div
					key={i}
					style={{
						display: "flex",
						color: dark ? "#bbc6ce" : "#415462"
					}}
				>
					<Twitter
						style={{
							width: "10%",
							flexShrink: 0,
							margin: "auto",
							paddingRight: "1em"
						}}
						width="24px"
						onClick={() => openTweetDetail(c.index)}
					/>
					<p style={{ flexGrow: 1 }}>{c.text}</p>
				</div>
			))}
			<TweetModal
				isOpen={showModal}
				toggleModal={setShowModal}
				tweet={tweet}
				index={index}
				setTweet={setTweet}
				postToTwitter={postToTwitter}
				removeFromChoices={removeFromChoices}
			/>
		</Fragment>
	)
}

export default OpenAI
export { OpenAIHeadline, fetchOpenAI }
