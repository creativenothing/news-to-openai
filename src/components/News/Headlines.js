import React from "react"
const dark = window.matchMedia("(prefers-color-scheme: dark)").matches
const news_dir = require.context("../../data/covid", false, /\.json$/)

/*
 * this isn't working (doing some weird cropping for the gen news titles,
 * and the covid news titles don't have this problem so removing for now.
 *
 * const trimTitle = title => title.slice(0, title.lastIndexOf("-") - 1)
 */

const findElapsedTime = dateString => {
	const now = new Date()
	const pubdate = new Date(dateString)
	const diff = now.getTime() - pubdate.getTime()
	const minutes = Math.round(diff / 1000 / 60)
	const hours = Math.round(diff / 1000 / 60 / 60)
	const days = Math.round(diff / 1000 / 60 / 60 / 24)
	const weeks = Math.round(diff / 1000 / 60 / 60 / 24 / 7)
	const months = Math.round(diff / 1000 / 60 / 60 / 24 / 7 / 30)
	return minutes < 60
		? minutes === 1
			? minutes + " minute ago"
			: minutes + " minutes ago"
		: hours < 24
		? hours === 1
			? hours + " hour ago"
			: hours + " hours ago"
		: days < 7
		? days === 1
			? days + " day ago"
			: days + " days ago"
		: weeks < 4
		? weeks === 1
			? weeks + " week ago"
			: weeks + " weeks ago"
		: months < 12
		? months === 1
			? months + " month ago"
			: months + " months ago"
		: pubdate
}

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

const Headline = props => {
	const { article, sendSeed, newslist } = props
	return (
		<article
			className="headline"
			key={article.publishedAt}
			style={{ color: dark ? "#bbc6ce" : "#415462" }}
		>
			<div className="main">
				<img src={article.urlToImage} alt="" />
				<div>
					<h6>{article.source.name}</h6>
					<p>{article.title}</p>
				</div>
			</div>
			<div className="info">
				<small>{findElapsedTime(article.publishedAt)}</small>
				<span role="button" className="contrast outline">
					<small onClick={e => sendSeed(article.title)}> generate tweets</small>
				</span>
			</div>
		</article>
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

export { allNews, Headline, findElapsedTime }
