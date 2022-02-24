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
const NEWS_API_KEY = process.env.REACT_APP_NEWSAPI_KEY
console.log("THIS SHOULD BE THE KEY", NEWS_API_KEY)
//todo change to general
//const filepath = __dirname + "/../data/news/" + slug + ".json"

const sources =
	"abc-news,al-jazeera-english,associated-press,axios,bbc-news,breitbart,cbc-news,cnn,fox-news,google-news,msnbc,national-review,nbc-news,newsweek,politico,reuters,the-american-conservative,the-hill,the-washington-post,usa-today,vice-news"

const headers = { "x-api-key": NEWS_API_KEY }
const params = {
	apiKey: NEWS_API_KEY,
	language: "en",
	sources,
	pageSize: 100
}

console.log({ headers, params })
const fetchCovidHeadlines = otherParams =>
	axios
		.get(NEWS_API_PATH, { headers, params: { q: "covid", ...otherParams } })
		.then(({ data }) => data)
		.catch(err => console.log(err))

const fetchGenHeadlines = params =>
	axios
		.get(NEWS_API_PATH, { params })
		.then(({ data }) => data)
		.catch(err => console.log(err.message))

const saveArticle = article => {
	const slug = slugify(article.title)
	const filepath = __dirname + "/../data/covid/" + slug + ".json"
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
		fetchCovidHeadlines(newParams).then(data => saveResults(data))
	}
}

const downloadAllNews = () => {
	fetchCovidHeadlines(params)
		.then(data => {
			saveArticle(data)
			paginate(data)
		})
		.catch(e => console.log(e))
}

downloadAllNews()
