const dark = window.matchMedia("(prefers-color-scheme: dark)").matches
const news_dir = require.context("../../data/news", false, /\.json$/)

const trimTitle = title => title.slice(0, title.lastIndexOf("-") - 1)
const formatDate = dateString => {
	const date = new Date(dateString)
	const month = date.getMonth()
	console.log(month)
}

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

// const fetchNews
//
// don't want to write it until production because
// it will fetch every time it refreshes which wouldn't be good...
//
//
const Headlines = props => {
	const { newslist, sendSeed } = props

	return (
		<div>
			<div>
				<h4>Current Headlines</h4>
			</div>
			{newslist.map((n, i) => (
				<article
					key={i}
					style={{
						marginTop: 0,
						marginBottom: 0,
						color: dark ? "#bbc6ce" : "#415462"
					}}
					onClick={e => sendSeed(n.title)}
				>
					<div className="headlines">
						<div className="main">
							<img src={n.urlToImage} alt="" />
							<div>
								<h6>{n.source.name}</h6>
								<p>{trimTitle(n.title)}</p>
							</div>
						</div>
						<div className="info">
							<small>{findElapsedTime(n.publishedAt)}</small>
						</div>
					</div>
				</article>
			))}
		</div>
	)
}

export default Headlines

export { allNews }
