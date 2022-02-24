import React, { useState, useEffect } from "react"

import Navbar from "./components/Navbar"
import OpenAI, { OpenAIHeadline, fetchOpenAI } from "./components/OpenAI"
import Headlines, { allNews } from "./components/News/Headlines"
import NewsSearch from "./components/News/NewsSearch"
import { Triangle } from "react-loader-spinner"

const Loading = () => {
	return (
		<div className="loading">
			<div className="sk-bounce sk-center">
				<div className="sk-bounce-dot"></div>
				<div className="sk-bounce-dot"></div>
			</div>
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
					onClick={() => alert("fix this!")}
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

	const findPageTitle = () => {
		switch (component) {
			case "openai":
				return "Open AI"
			case "headlines":
				return "Headlines"
			default:
				return ""
		}
	}

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
			if (error) handleError(error)
			else {
				setChoices(data.choices)
				setComponent("openai")
			}
		})
	}
	const title = findPageTitle()
	return (
		<main className="container-fluid">
			<Navbar title={title} setComponent={setComponent} newslist={newslist} />
			<div>
				{component === "openai" ? (
					<OpenAIHeadline article={newslist.find(n => n.title === seed)} />
				) : (
					<div />
				)}
			</div>
			<div className="content">
				{component === "loading" ? (
					<Loading />
				) : component === "error" ? (
					<Error />
				) : component === "headlines" ? (
					<Headlines
						setComponent={setComponent}
						newslist={newslist}
						sendSeed={sendSeed}
					/>
				) : component === "search" ? (
					<NewsSearch setComponent={setComponent} />
				) : component === "openai" ? (
					<OpenAI
						article={newslist.find(n => n.title === seed)}
						seed={seed}
						choices={choices}
					/>
				) : (
					<div>something is problematic...</div>
				)}
			</div>
			<footer>
				&#9398; <small>anti-copyright</small>
			</footer>
		</main>
	)
}

export default App
