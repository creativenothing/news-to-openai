import React, { useState, useEffect } from "react"

import Navbar from "./components/Navbar"
import OpenAI, { fetchOpenAI } from "./components/OpenAI"
import Headlines, { allNews } from "./components/News/Headlines"

import { Triangle } from "react-loader-spinner"

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
	const [news, setNews] = useState(true)
	const [seed, setSeed] = useState("")
	const [choices, setChoices] = useState([])

	const handleError = err => {
		console.log(error)
		setError(true)
	}

	useEffect(() => {
		setNewslist(allNews)
	}, [])

	const sendSeed = seed => {
		console.log(seed)
		setSeed(seed)
		setLoading(true)
		setNews(false)
		fetchOpenAI(seed).then(({ data, error }) => {
			error ? handleError(error) : setChoices(data.choices)
			setLoading(false)
		})
	}

	return (
		<div className="tiqqun-ai container">
			<Navbar newsModal={newsModal} setNewsModal={setNewsModal} />

			{loading ? (
				<Loading />
			) : error ? (
				<Error setError={setError} />
			) : news ? (
				<Headlines newslist={newslist} sendSeed={sendSeed} />
			) : (
				<OpenAI seed={seed} choices={choices} />
			)}
		</div>
	)
}

export default App
