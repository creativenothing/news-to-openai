import * as hero from "../assets/img/hero"
import quotes from "../data/quotes.json"

const images = Object.keys(hero)
const selectedImage = hero[images[Math.floor(Math.random() * quotes.length)]]

const Home = props => {
	const { setComponent } = props
	const quote = quotes[Math.floor(Math.random() * quotes.length)]
	return (
		<div>
			<h4>Instructions</h4>
			<p>
				I am a bot that reads current news headlines and generates pithy tweets
				in response.
			</p>
			<p>
				View{" "}
				<a href="#" onClick={() => setComponent("home")}>
					headlines
				</a>{" "}
				to generate a selection of tweets from a current news headline, or use
				<a href="#" onClick={() => setComponent("search")}>
					{" "}
					search
				</a>{" "}
				to search for a specific topic.
			</p>
			<hr />
			<img src={selectedImage} className="avatar" alt="" />
			<blockquote>{quote} </blockquote>
		</div>
	)
}

export default Home
