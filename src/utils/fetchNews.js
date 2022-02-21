/*
 *  This is a utility function for downloading and saving
 *  news results from the https://newsapi.org API.
 *
 *  To run: first, export the API key to the environment:
 *
 *           export NEWS_API_KEY=<key goes here>
 *
 *  the key can be found in .env
 */

const slugify = require("react-slugify").default
const axios = require("axios")
const fs = require("fs")

const NEWS_API_PATH = "https://newsapi.org/v2/top-headlines"
const NEWS_API_KEY = process.env.NEWSAPI_API_KEY

const params = {
	apiKey: NEWS_API_KEY,
	country: "us",
	language: "en",
	pageSize: 100
}

const fetchNews = params =>
	axios
		.get(NEWS_API_PATH, { params: params })
		.then(({ data }) => data)
		.catch(err => console.log(err))

const saveArticle = article => {
	console.log(article.title)
	console.log(slugify)
	const slug = slugify(article.title)
	const filepath = __dirname + "/news/" + slug + ".json"
	console.log("FILEPATH: " + filepath)
	fs.writeFileSync(filepath, JSON.stringify(article))
}

const saveResults = data => {
	data.articles.map(a => saveArticle(a))
}

const paginate = data => {
	const { totalResults } = data
	const pages = Math.ceil(totalResults / 10)
	for (let page = 1; page < 2; page++) {
		const newParams = { page, ...params }
		fetchNews(newParams).then(data => saveResults(data))
	}
}

const downloadAllNews = () => {
	fetchNews(params)
		.then(data => {
			saveArticle(data)
			paginate(data)
		})
		.catch(e => console.log(e))
}

downloadAllNews()
