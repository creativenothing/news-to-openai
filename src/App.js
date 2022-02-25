import React, { useState, useEffect } from "react"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import OpenAI, { OpenAIHeadline, fetchOpenAI } from "./components/OpenAI"
import Headlines, { HeadlineFilter, allNews } from "./components/News/Headlines"
import NewsSearch from "./components/News/NewsSearch"

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
	const { setComponent } = props
	return (
		<dialog open>
			<article>
				<div
					aria-label="Close"
					className="close"
					onClick={() => setComponent("home")}
				></div>
				<p>Something went wrong. Please try again.</p>
			</article>
		</dialog>
	)
}

const EmptyResults = props => {
	return (
		<div>
			<p>
				You have not generated any tweets, yet. When you do, they will appear
				here.
			</p>
		</div>
	)
}

const App = () => {
	const [component, setComponent] = useState("home")
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

	const filterNews = keywords => {
		const keywordArray = keywords.toLowerCase().replace(",", " ").split(" ")
		const filteredNews = allNews.filter(n =>
			keywordArray.some(word => n.description.toLowerCase().includes(word))
		)
		setNewslist(filteredNews)
	}
	const clearFilter = () => setNewslist(allNews)

	const title = findPageTitle()
	return (
		<main className="container-fluid">
			<Navbar title={title} setComponent={setComponent} newslist={newslist} />
			<div>
				{component === "openai" && choices.length > 0 ? (
					<OpenAIHeadline article={newslist.find(n => n.title === seed)} />
				) : component === "headlines" ? (
					<HeadlineFilter clearFilter={clearFilter} filterNews={filterNews} />
				) : (
					<div />
				)}
			</div>
			<div className="content">
				{component === "loading" ? (
					<Loading />
				) : component === "error" ? (
					<Error setComponent={setComponent} />
				) : component === "home" ? (
					<Home />
				) : component === "headlines" ? (
					<Headlines
						setComponent={setComponent}
						newslist={newslist}
						sendSeed={sendSeed}
					/>
				) : component === "search" ? (
					<NewsSearch setComponent={setComponent} />
				) : component === "openai" ? (
					choices.length === 0 ? (
						<EmptyResults />
					) : (
						<OpenAI
							article={newslist.find(n => n.title === seed)}
							seed={seed}
							choices={choices}
						/>
					)
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
