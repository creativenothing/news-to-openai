import { ReactComponent as Twitter } from "../img/twitter.svg"

const Navbar = props => {
	return (
		<nav data-theme="light">
			<ul>
				<li>
					<strong>Tiqqun Twitter AI</strong>
				</li>
			</ul>
			<ul>
				<li>
					<Twitter />
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
