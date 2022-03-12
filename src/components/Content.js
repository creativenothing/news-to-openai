import { Fragment, useState, useEffect } from "react"
import axios from "axios"
import Home from "./Home"
import Headlines, { HeadlineFilter } from "./News/Headlines"
import OpenAI, { OpenAIHeadline } from "./OpenAI"
import openairequest from "../data/openairequest"

const fetchNews = () => {
	return axios
		.get("/news.json", {
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => {
			console.dir(res.data)
			return res.data
		})
		.catch(e => console.log(e))
}
const sortByDate = newslist =>
	newslist
		.map(n => {
			n.date = new Date(n.publishedAt)
			return n
		})
		.sort((a, b) => b.date - a.date)
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

const Content = props => {
	const [newslist, setNewslist] = useState([])
	const [seed, setSeed] = useState("")
	const [choices, setChoices] = useState([])
	const [filters, setFilters] = useState({ keywords: [] })

	useEffect(() => {
		fetchNews().then(newslist => setNewslist(sortByDate(newslist)))
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
				setChoices(
					data.choices.map(c => ({ text: c.text.trim(), index: c.index }))
				)
				setComponent("openai")
			}
		})
	}

	const filterByKeywords = keywords => {
		const keywordArray = keywords.toLowerCase().replace(",", " ").split(" ")
		const filteredNews = [...newslist].filter(
			n =>
				!n.description ||
				keywordArray.some(word => !n.description.toLowerCase().includes(word))
		)
		const filterIds = filteredNews.map(n => n.id)
		setFilters({ keywords: filterIds })
	}
	const filter = newslist =>
		[...newslist].filter(n => !filters.keywords.includes(n.id))

	const clearFilter = () => setFilters({ keywords: [] })

	const removeFromChoices = index => {
		setChoices(choices.filter(c => c.index !== index))
	}

	const { component, setComponent } = props
	const headlineFilter = (
		<HeadlineFilter
			filterByKeywords={filterByKeywords}
			clearFilter={clearFilter}
		/>
	)
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
						headlineFilter={headlineFilter}
						setComponent={setComponent}
						newslist={filter(newslist)}
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
