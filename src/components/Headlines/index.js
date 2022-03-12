import React, { useState, useEffect } from "react"
import axios from "axios"
import Headline from "./Headline"
import { ReactComponent as Search } from "../../assets/img/search.svg"

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
	const { filterByKeywords, clearFilter } = props
	const [search, setSearch] = useState("")

	const handleChange = e => setSearch(e.target.value)
	const handleSubmit = e => {
		e.preventDefault()
		filterByKeywords(search)
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
				onClick={() => filterByKeywords("covid")}
			>
				covid
			</span>
			<span
				role="button"
				className="secondary outline"
				onClick={() => filterByKeywords("ukraine")}
			>
				ukraine
			</span>
		</div>
	)
}

const Headlines = props => {
	const { newslist, headlineFilter } = props
	return (
		<React.Fragment>
			{headlineFilter}
			{newslist.map(n => (
				<Headline key={n.id} article={n} {...props} />
			))}
		</React.Fragment>
	)
}

export default Headlines

export { HeadlineFilter }
