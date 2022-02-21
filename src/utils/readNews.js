const fs = require("fs")

const path = "./data/news"
const files = fs.readdirSync(path)

const allNews = []

files.map(f => {
	const news = fs.readFileSync(path + "/" + f)
	console.log(news.toString())
	allNews.push(news)
})

module.exports = allNews
