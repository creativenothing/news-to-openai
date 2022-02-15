import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import "./css/pico.css"
import "./css/custom.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
