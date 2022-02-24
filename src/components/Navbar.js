import { ReactComponent as Twitter } from "../assets/img/twitter.svg"
import { ReactComponent as News } from "../assets/img/news.svg"

const Navbar = props => {
	const { setComponent, title } = props
	console.log(props)
	return (
		<nav data-theme="light">
			<ul>
				<li>
					<strong>{title}</strong>
				</li>
			</ul>
			<ul>
				<li>
					<News
						width={50}
						height={50}
						onClick={() => setComponent("headlines")}
					/>
				</li>
				<li>
					<Twitter />
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
