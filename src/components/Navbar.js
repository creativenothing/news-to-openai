import { ReactComponent as Twitter } from "../img/twitter.svg"
import { ReactComponent as News } from "../img/news.svg"

const Navbar = props => {
	const { setNewsModal } = props
	return (
		<nav data-theme="light">
			<ul>
				<li>
					<strong>Tiqqun Twitter AI</strong>
				</li>
			</ul>
			<ul>
				<li>
					<News width={50} onClick={() => setNewsModal(true)} />
				</li>
				<li>
					<Twitter />
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
