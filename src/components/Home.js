import * as hero from "../assets/img/hero"
import quotes from "../data/quotes.json"

const images = Object.keys(hero)
const selectedImage = hero[images[Math.floor(Math.random() * quotes.length)]]

const Home = props => {
	const quote = quotes[Math.floor(Math.random() * quotes.length)]
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}
		>
			<img src={selectedImage} className="avatar" alt="" />
			<blockquote>{quote} </blockquote>
		</div>
	)
}

export default Home
