import axios from "axios"
import findElapsedTime from "./findElapsedTime"
import fetchOpenAI from "./fetchOpenAI"

const fetchNews = () =>
	axios
		.get("/news.json")
		.then(({ data }) => data)
		.catch(e => console.log(e))

const sortByDate = newslist =>
	newslist
		.map(n => {
			n.date = new Date(n.publishedAt)
			return n
		})
		.sort((a, b) => b.date - a.date)

export { findElapsedTime, fetchNews, fetchOpenAI, sortByDate }
