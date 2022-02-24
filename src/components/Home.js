import { Fragment } from "react"
import * as hero from "../assets/img/hero"
import quotes from "../data/quotes.json"

const images = Object.keys(hero)
const selectedImage = hero[images[Math.floor(Math.random() * quotes.length)]]

const Home = props => {
	const { setComponent } = props
	const quote = quotes[Math.floor(Math.random() * quotes.length)]
	return (
		<Fragment>
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
				to generate a selection of tweets from a current news headline.
			</p>
			<hr />
			<blockquote>
				<em>{quote}</em>
			</blockquote>
		</Fragment>
	)
}

export default Home
