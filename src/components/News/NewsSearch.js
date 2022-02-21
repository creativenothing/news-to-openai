import { useState } from "react"
import { Modal } from "./Modals"
import { ReactComponent as X } from "../img/x.svg"

import ISOcountries from "../countries.json"

const NewsSearch = props => {
	const [country, setCountry] = useState(false)
	const [selected, select] = useState([])
	const countryString =
		selected.length === 0 ? "Worldwide" : selected.map(c => c.Name + ", ")

	const addCountry = ctry => select([...selected, ctry])
	const delCountry = ctry => select(selected.filter(c => c.Code !== ctry.Code))

	const handleSelect = ctry => {
		selected.includes(ctry.Code) ? addCountry(ctry) : delCountry(ctry)
	}
	return (
		<div>
			<details open>
				<summary>Search Options</summary>
				<div
					className="row"
					style={{ paddingTop: "2rem", paddingLeft: "1rem" }}
				>
					<div className="col-xs-6 middle-xs">
						<a href="#" className="secondary" onClick={() => setCountry(true)}>
							Countries
						</a>
					</div>
					<div className="center-xs middle-xs col-xs-6">
						<p>{countryString}</p>
					</div>
				</div>
			</details>
			<NewsSearchModal
				isOpen={country}
				toggleModal={setCountry}
				handleSelect={handleSelect}
			/>
		</div>
	)
}

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

const NewsSearchModal = props => {
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

export default NewsSearch
