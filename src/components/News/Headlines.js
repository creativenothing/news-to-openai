import React from "react"
import axios from "axios"

import Headline from "./Headline"
import { ReactComponent as Pen } from "../../assets/img/pen-tool.svg"
import findElapsedTime from "../../utils/findElapsedTime"

const news_dir = require.context("../../data/covid", false, /\.json$/)

const readNews = r => {
	let results = []
	r.keys().forEach(i => {
		const newResult = r(i)
		results = results.concat(newResult)
	})
	return results
}

const allNews = readNews(news_dir)

const sortByDate = newslist => {
	newslist
		.map(n => {
			n.date = new Date(n.publishedAt)
			return n
		})
		.sort((a, b) => {
			return b.date - a.date
		})
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

export { allNews, Headline, findElapsedTime }
