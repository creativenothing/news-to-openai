import React, { useState } from "react"

import Headline from "./Headline"
import { ReactComponent as Search } from "../../assets/img/search.svg"
import findElapsedTime from "../../utils/findElapsedTime"

const news_dir = require.context("../../data/news", false, /\.json$/)

const readNews = r => {
	let results = []
	r.keys().forEach(i => {
		const newResult = r(i)
		results = results.concat(newResult)
	})
	return results
}

const sortByDate = newslist =>
	newslist
		.map(n => {
			n.date = new Date(n.publishedAt)
			return n
		})
		.sort((a, b) => b.date - a.date)

const allNews = sortByDate(readNews(news_dir))

const SearchBar = props => {
	const { handleChange, handleSubmit, search } = props

	return (
		<form onSubmit={handleSubmit}>
			<Search />
			<input
				name="search"
				value={search}
				onChange={handleChange}
				placeholder="filter by keyword(s)"
			/>
		</form>
	)
}

const HeadlineFilter = props => {
	const { filterNews, clearFilter } = props
	const [search, setSearch] = useState("")

	const handleChange = e => setSearch(e.target.value)
	const handleSubmit = e => {
		e.preventDefault()
		filterNews(search)
		setSearch("")
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center"
			}}
		>
			<SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
			<span role="button" className="secondary outline" onClick={clearFilter}>
				all
			</span>
			<span
				role="button"
				className="secondary outline"
				onClick={() => filterNews("covid")}
			>
				covid
			</span>
			<span
				role="button"
				className="secondary outline"
				onClick={() => filterNews("ukraine")}
			>
				ukraine
			</span>
		</div>
	)
}

const Headlines = props => {
	const { newslist } = props
	sortByDate(newslist)
	return (
		<React.Fragment>
			{newslist.map(n => (
				<Headline key={n.publishedAt} article={n} {...props} />
			))}
		</React.Fragment>
	)
}

export default Headlines

export { allNews, Headline, HeadlineFilter, findElapsedTime }
