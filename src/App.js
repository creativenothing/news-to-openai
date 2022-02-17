import React, { useState, useEffect, useRef } from "react"
import axios from "axios"

import Navbar from "./components/Navbar"
import {
	Modal,
	ModalFooter,
	NewsModal,
	TweetModal,
	NewsList,
	TweetList
} from "./components/Modals"

import { Triangle } from "react-loader-spinner"
import { ReactComponent as Twitter } from "./img/twitter.svg"
import { ReactComponent as X } from "./img/x.svg"
import { ReactComponent as Edit } from "./img/edit-2.svg"

import news from "./news.json"

const API_PATH = "http://192.168.1.190:8000/api/"
const NEWS_API_PATH = "https://newsdata.io/api/1/news/"
const NEWS_API_KEY = process.env.REACT_APP_KEY
const params = { apiKey: NEWS_API_KEY, language: "en", category: "politics" }

const Loading = () => {
	return (
		<div className="loading">
			<Triangle color="#FE5000" height="100" width="100" />
		</div>
	)
}

const Error = ({ setError }) => {
	return (
		<dialog open>
			<article>
				<div
					aria-label="Close"
					className="close"
					onClick={() => setError(false)}
				></div>
				<p>Something went wrong. Please try again.</p>
			</article>
		</dialog>
	)
}

const App = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [newslist, setNewslist] = useState([])
	const [newsModal, setNewsModal] = useState(false)
	const [tweetlist, setTweetlist] = useState([])
	const [tweetModal, setTweetModal] = useState(true)
	const [tweet, setTweet] = useState()

	const fetchTweets = () => {
		setLoading(true)
		axios
			.get(API_PATH)
			.then(({ data }) => {
				setTweetlist(data)
				setLoading(false)
			})
			.catch(e => {
				setLoading(false)
				setError(true)
				console.log(e)
			})
	}

	useEffect(() => {
		setNewslist(news.results)
	})

	return (
		<div className="tiqqun-ai container">
			<Navbar setNewsModal={setNewsModal} />

			{loading ? (
				<Loading />
			) : error ? (
				<Error setError={setError} />
			) : (
				<TweetList tweetlist={tweetlist} setTweet={setTweet} />
			)}
			<TweetModal
				tweet={tweet}
				setTweet={setTweet}
				isOpen={tweetModal}
				toggleModal={setTweetModal}
			/>
			<NewsModal
				newslist={newslist}
				isOpen={newsModal}
				toggleModal={setNewsModal}
			/>
			<button className="secondary" onClick={fetchTweets}>
				Fetch Tweets
			</button>
		</div>
	)
}

export default App
