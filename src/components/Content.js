import { useState, useEffect } from "react"
import axios from "axios"
import { Route, Routes, Navigate } from "react-router-dom"
import Home from "./Home"
import Headlines, { HeadlineFilter } from "./Headlines"
import OpenAI from "./OpenAI"
import { fetchNews, sortByDate, fetchOpenAI } from "../utils"

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

	const testBackend = () => {
		axios.get("/test-backend").then(res => console.log(res))
	}
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
				return (
					<div>
						<Home setComponent={setComponent} />
					</div>
				)
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
	const auth = () =>
		axios
			.get("/auth/twitter")
			.then(res => console.log(res))
			.catch(e => console.log(e))
	return (
		<div className="content">
			<span role="button" onClick={testBackend}>
				Test Backend
			</span>
			<span role="button" onClick={auth}>
				Test auth
			</span>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route
					exact
					path="/headlines"
					element={
						<Headlines
							headlineFilter={headlineFilter}
							setComponent={setComponent}
							newslist={filter(newslist)}
							sendSeed={sendSeed}
						/>
					}
				/>
				<Route
					exact
					path="/results"
					element={
						<OpenAI
							article={newslist.find(n => n.title === seed)}
							seed={seed}
							choices={choices}
							removeFromChoices={removeFromChoices}
						/>
					}
				/>
			</Routes>
		</div>
	)
}
export default Content
