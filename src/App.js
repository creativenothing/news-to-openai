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

const Error = props => {
	return (
		<dialog open>
			<article>
				<div
					aria-label="Close"
					className="close"
					onClick={() => console.log("fix this!")}
				></div>
				<p>Something went wrong. Please try again.</p>
			</article>
		</dialog>
	)
}

const App = () => {
	const [component, setComponent] = useState("headlines")
	const [newslist, setNewslist] = useState([])
	const [seed, setSeed] = useState("")
	const [choices, setChoices] = useState([])

	const handleError = err => {
		console.log(err)
		setComponent("error")
	}

	useEffect(() => {
		setNewslist(allNews)
	}, [])

	const sendSeed = seed => {
		setSeed(seed)
		setComponent("loading")
		fetchOpenAI(seed).then(({ data, error }) => {
			error ? handleError(error) : setChoices(data.choices)
			setComponent("openai")
		})
	}

	return (
		<div className="tiqqun-ai container">
			<Navbar setComponent={setComponent} newslist={newslist} />

			{component === "loading" ? (
				<Loading />
			) : component === "error" ? (
				<Error />
			) : component === "headlines" ? (
				<Headlines
					setComponent={setComponent}
					newslist={newslist}
					sendSeed={sendSeed}
					fetchOpenAI={fetchOpenAI}
				/>
			) : component === "openai" ? (
				<OpenAI setComponent={setComponent} seed={seed} choices={choices} />
			) : (
				<div>something is problematic...</div>
			)}
		</div>
	)
}

export default App
