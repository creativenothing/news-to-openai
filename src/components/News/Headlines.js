const dark = window.matchMedia("(prefers-color-scheme: dark)").matches

const news_dir = require.context("../../data/news", false, /\.json$/)

const readNews = r => {
	let results = []
	r.keys().forEach(i => {
		const newResults = r(i)
		results = results.concat(newResults)
	})
	return results
}

const allNews = readNews(news_dir)

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
						marginTop: "0",
						marginBottom: 0,
						color: dark ? "#bbc6ce" : "#415462"
					}}
					onClick={e => sendSeed(e.target.innerHTML)}
				>
					{n.title}
				</article>
			))}
		</div>
	)
}

export default Headlines

export { allNews }
