const axios = require("axios")

const NEWS_API_PATH = "https://newsapi.org/v2/top-headlines"
const NEWS_API_KEY = process.env.REACT_APP_NEWSAPI_KEY

const sources =
	"abc-news,al-jazeera-english,associated-press,axios,bbc-news,breitbart,cbc-news,cnn,fox-news,google-news,msnbc,national-review,nbc-news,newsweek,politico,reuters,the-american-conservative,the-hill,the-washington-post,usa-today,vice-news"

const headers = { "x-api-key": NEWS_API_KEY }
const defaultParams = {
	language: "en",
	sources,
	pageSize: 100
}

const fetchHeadlines = sentParams => {
	const params = { ...defaultParams, ...sentParams }
	return axios
		.get(NEWS_API_PATH, { headers, params })
		.then(({ data }) => data.articles)
		.catch(err => console.log(err))
}

/*
 * currently cannot paginate because can only get 100 results
 *
const paginate = (data, params) => {
	const { totalResults } = data
	const pages = Math.ceil(totalResults / 10)
	const allArticles = data.articles
	for (let page = 1; page < 2; page++) {
		const newParams = { page, ...params }
		fetchHeadlines(newParams).then(res => {
			console.log(res)
			if (res.data) allArticles.concat(data.articles)
		})
	}
	console.log(allArticles.length + " Headlines found.")
	return allArticles
}
*
*/

module.exports = { fetchHeadlines }
