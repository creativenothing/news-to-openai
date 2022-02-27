import { ReactComponent as Twitter } from "../assets/img/twitter.svg"
import { ReactComponent as News } from "../assets/img/news.svg"

const Navbar = props => {
	const { setComponent } = props
	return (
		<nav>
			<ul>
				<li>
					<h4>inhabit ai</h4>
				</li>
			</ul>
			<ul>
				<li>
					<a href="#" onClick={() => setComponent("home")}>
						home
					</a>
				</li>
				<li>
					<a href="#" onClick={() => setComponent("headlines")}>
						headlines
					</a>
				</li>
				<li>
					<a href="#" onClick={() => setComponent("openai")}>
						results
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
