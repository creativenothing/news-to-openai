import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./assets/css/pico.css"
import "./assets/css/custom.css"
import "./assets/css/flexboxgrid.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
