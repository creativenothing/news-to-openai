import { Fragment, useState, useEffect } from "react"
import Home from "./Home"
import Headlines from "./News/Headlines"
import OpenAI, { OpenAIHeadline } from "./OpenAI"

import { allNews } from "./News/Headlines"
import openairequest from "../data/openairequest"

const fetchOpenAIDev = () =>
	new Promise(resolve => resolve({ data: openairequest }))
const fetchOpenAIProd = require("./OpenAI").fetchOpenAI
const fetchOpenAI =
	process.env.NODE_ENV === "production" ? fetchOpenAIProd : fetchOpenAIDev

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

const headerLayout = props => ({
	openai: <OpenAIHeadline {...props} />
})

const contentLayout = props => ({
	home: <Home {...props} />,
	headlines: <Headlines {...props} />,
	openai: <OpenAI {...props} />,
	loading: <Loading {...props} />,
	error: <Error {...props} />
})

const Content = props => {
	const [newslist, setNewslist] = useState([])
	const [seed, setSeed] = useState("")
	const [choices, setChoices] = useState([])

	useEffect(() => {
		setNewslist(allNews)
	}, [])

	const handleError = err => {
		console.log(err)
		setComponent("error")
	}

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
		const filteredNews = allNews.filter(
			n =>
				n.description &&
				keywordArray.some(word => n.description.toLowerCase().includes(word))
		)
		setNewslist(filteredNews)
	}

	const clearFilter = () => setNewslist(allNews)

	const removeFromChoices = index => {
		setChoices(choices.filter(c => c.index !== index))
	}

	const { component, setComponent } = props

	const renderSwitch = () => {
		switch (component) {
			case "loading":
				return <Loading />
			case "error":
				return <Error setComponent={setComponent} />
			case "home":
				return <Home setComponent={setComponent} />
			case "headlines":
				return (
					<Headlines
						setComponent={setComponent}
						newslist={newslist}
						sendSeed={sendSeed}
					/>
				)
			case "openai":
				return (
					<OpenAI
						article={newslist.find(n => n.title === seed)}
						seed={seed}
						choices={choices}
						removeFromChoices={removeFromChoices}
					/>
				)
			default:
				return <div>something is problematic...</div>
		}
	}

	return <div className="content">{renderSwitch(component)}</div>
}
export default Content
