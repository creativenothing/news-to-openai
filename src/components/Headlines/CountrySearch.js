import Modal from "../Modal"
import { ReactComponent as X } from "../../assets/img/x.svg"

import ISOcountries from "../../data/countries.json"

const CountryRow = props => {
	const { country, handleSelect } = props
	const [selected, setSelected] = useState(false)
	const select = () => {
		setSelected(!selected)
		handleSelect(country)
	}
	return (
		<li
			className={`countrylistitem ${selected ? "selected" : ""}`}
			style={{
				backgroundImage: `url(./flags/${country.Code.toLowerCase()}.png)`
			}}
			key={country.Code}
			onClick={() => select(country)}
		>
			{country.Name}
		</li>
	)
}
const CountrySearch = props => {
	const [showModal, setShowModal] = useState(false)
	const [countries, setCountries] = useState([])
	const countryString =
		countries.length === 0 ? "Worldwide" : countries.map(c => c.Name + ", ")

	const addCountry = ctry => setCountries([...countries, ctry])
	const delCountry = ctry =>
		setCountries(countries.filter(c => c.Code !== ctry.Code))

	const handleSelect = ctry => {
		countries.includes(ctry.Code) ? delCountry(ctry) : addCountry(ctry)

		return (
			<div>
				<details open>
					<summary>Search Options</summary>
					<div
						className="row"
						style={{ paddingTop: "2rem", paddingLeft: "1rem" }}
					>
						<div className="col-xs-6 middle-xs">
							<a
								href="#"
								className="secondary"
								onClick={() => setShowModal(true)}
							>
								Countries
							</a>
						</div>
						<div className="center-xs middle-xs col-xs-6">
							<p>{countryString}</p>
						</div>
					</div>
				</details>
				<CountryModal
					isOpen={showModal}
					toggleModal={setShowModal}
					handleSelect={handleSelect}
				/>
			</div>
		)
	}
}

const CountryModal = props => {
	const { isOpen, toggleModal, handleSelect } = props
	return (
		<div>
			<Modal isOpen={isOpen}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						height: "5rem"
					}}
				>
					<hgroup>
						<h4>Limit results by country</h4>

						<h6>(Select up to five)</h6>
					</hgroup>
					<X onClick={() => toggleModal(false)} />
				</div>
				<ul className="countrylist">
					{ISOcountries.map(country => (
						<CountryRow
							key={country.Code}
							country={country}
							handleSelect={handleSelect}
						/>
					))}
				</ul>
			</Modal>
		</div>
	)
}
export default CountrySearch
