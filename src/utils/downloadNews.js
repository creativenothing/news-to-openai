/*
 *  This is a back-end utility function for downloading and saving
 *  news results from the https://newsapi.org API.
 *
 *  To run: first, export the API key to the environment:
 *
 *           export NEWS_API_KEY=<key goes here>
 *
 *  the key can be found in .env
 */
const fs = require("fs")
const slugify = require("react-slugify").default
const { fetchHeadlines } = require("./fetchNews")

let id = fs.readdirSync(__dirname + "/../data/news").length + 1

const saveArticle = article => {
	console.log("saving article " + id + ": " + article.title)
	article.id = id
	id++
	const slug = slugify(article.title)
	const filepath = __dirname + "/../data/news/" + slug + ".json"
	fs.writeFileSync(filepath, JSON.stringify(article))
}

const saveArticles = data => {
	data.articles.map(a => saveArticle(a))
}

const downloadAllHeadlines = () => {
	fetchHeadlines()
		.then(articles => {
			console.log(articles.length + " total results")
			articles.map(a => saveArticle(a))
		})
		.catch(e => console.log(e))
}

downloadAllHeadlines()
