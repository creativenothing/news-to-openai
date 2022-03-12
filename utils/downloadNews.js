/*
 *  This is a back-end utility function for downloading and saving
 *  news results from the https://newsapi.org API.
 *
 *  To run: first, export the API key to the environment:
 *
 *     export REACT_APP_NEWSAPI_KEY=<key goes here>
 *
 *  the key can be found in .env
 */
const fs = require("fs")
const path = require("path")
const axios = require("axios")
const slugify = require("react-slugify").default

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

const DATADIR = path.resolve(__dirname, "../data/news/")
const NEWSFILEPATH = path.resolve(__dirname, "../public/news.json")
let id = fs.readdirSync(__dirname + "/../data/news").length + 1

console.log("data directory: " + DATADIR)
console.log("newsfile path: " + NEWSFILEPATH)
console.log("number of existing articles: " + id)

const fetchHeadlines = sentParams => {
	const params = { ...defaultParams, ...sentParams }
	console.log("Fetching headlines from " + NEWS_API_PATH)
	return axios
		.get(NEWS_API_PATH, { headers, params })
		.then(({ data }) => {
			console.log("Retrieved " + data.articles.length + " articles. ")
			return data.articles
		})
		.catch(err => console.log(err))
}

const saveArticle = article => {
	article.id = id
	id++
	const slug = slugify(article.title)
	const filepath = path.resolve(DATADIR, slug + ".json")
	fs.writeFileSync(filepath, JSON.stringify(article))
}

const downloadAllHeadlines = () =>
	fetchHeadlines()
		.then(articles => articles.forEach(a => saveArticle(a)))
		.catch(e => console.log(e))

writeNewsFileFromDir = () => {
	const filenames = fs.readdirSync(DATADIR)
	const articles = filenames
		.map(filename => fs.readFileSync(DATADIR + "/" + filename).toString())
		.join(",")
	console.log(
		"Writing " + filenames.length + " articles to " + NEWSFILEPATH + "."
	)
	fs.writeFileSync(NEWSFILEPATH, "[")
	fs.writeFileSync(NEWSFILEPATH, articles, { flag: "a" })
	fs.writeFileSync(NEWSFILEPATH, "]", { flag: "a" })
}

const fixIds = () => {
	let iter = 1
	const filenames = fs.readdirSync(DATADIR)
	const articles = filenames
		.map(filename => JSON.parse(fs.readFileSync(DATADIR + "/" + filename)))
		.map(a => {
			a.id = iter
			iter++
			return JSON.stringify(a)
		})
		.join(",")

	console.log(articles)
	fs.writeFileSync(NEWSFILEPATH, "[")
	fs.writeFileSync(NEWSFILEPATH, articles, { flag: "a" })
	fs.writeFileSync(NEWSFILEPATH, "]", { flag: "a" })
}

//fixIds()
//writeNewsFileFromDir()
downloadAllHeadlines().then(() => writeNewsFileFromDir())
