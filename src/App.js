import React, { useState } from "react"
import axios from "axios"

import { Triangle } from "react-loader-spinner"
import Navbar from "./components/Navbar"

const API_PATH = "http://192.168.1.190:8000/api/"

const TweetList = props => {
	const { tweetlist } = props
	return (
		<ul>
			{tweetlist.map((t, i) => (
				<li key={i}>{t}</li>
			))}
		</ul>
	)
}

const Loading = () => {
	return (
		<div className="loading">
			<Triangle color="#FE5000" height="100" width="100" />
		</div>
	)
}

const App = () => {
	const [tweetlist, setTweetlist] = useState([])
	const [isLoading, setLoading] = useState(false)

	const fetchTweets = () => {
		setLoading(true)
		axios.get(API_PATH).then(({ data }) => {
			setLoading(false)
			setTweetlist(data)
		})
	}
	return (
		<div className="tiqqun-ai container">
			<Navbar />
			{isLoading ? <Loading /> : <TweetList tweetlist={tweetlist} />}

			<button onClick={fetchTweets}>Fetch Tweets</button>
		</div>
	)
}

export default App
