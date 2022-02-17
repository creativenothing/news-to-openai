import React, { useState, useEffect, useRef } from "react"
import axios from "axios"

import { Triangle } from "react-loader-spinner"
import Navbar from "./components/Navbar"
import { ReactComponent as Twitter } from "./img/twitter.svg"
import { ReactComponent as X } from "./img/x.svg"
import { ReactComponent as Edit } from "./img/edit-2.svg"
const API_PATH = "http://192.168.1.190:8000/api/"

const TweetList = ({ tweetlist, setDetail }) => {
	return (
		<ul>
			{tweetlist.map((t, i) => (
				<li key={i} onClick={e => setDetail(e.target.innerText)}>
					{t}
				</li>
			))}
		</ul>
	)
}

const Loading = () => {
	return (
		<div className="loading">
			<Triangle color="#FE5000" height="100" width="100" />
		</div>
	)
}

const Error = ({ setError }) => {
	return (
		<dialog open>
			<article>
				<div
					aria-label="Close"
					className="close"
					onClick={() => setError(false)}
				></div>
				<p>Something went wrong. Please try again.</p>
			</article>
		</dialog>
	)
}

const Detail = ({ detail, setDetail }) => {
	const dialogRef = useRef(null)
	const articleRef = useRef(null)
	const click = e => {
		if (!articleRef.current.contains(e.target)) {
			closeDetail()
		}
	}
	useEffect(() => {
		if (!dialogRef.current.open && detail.length > 0) {
			dialogRef.current.showModal()
			document.addEventListener("mousedown", click)
		}
	})
	const closeDetail = () => {
		document.removeEventListener("mousedown", click)
		dialogRef.current.close()
		setDetail("")
	}
	return (
		<dialog ref={dialogRef}>
			<article ref={articleRef} style={{ width: "80%" }}>
				<p>{detail}</p>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						marginTop: "3rem",
						paddingTop: "1rem",
						borderTop: "1px solid grey"
					}}
				>
					<Twitter onClick={() => alert("You posted to twitter.")} />
					<Edit />
					<X onClick={() => closeDetail()} />
				</div>
			</article>
		</dialog>
	)
}

const App = ({ theme, setTheme }) => {
	const [tweetlist, setTweetlist] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [detail, setDetail] = useState("")

	const fetchTweets = () => {
		setLoading(true)
		axios
			.get(API_PATH)
			.then(({ data }) => {
				setTweetlist(data)
				setLoading(false)
			})
			.catch(e => {
				setLoading(false)
				setError(true)
				console.log(e)
			})
	}
	return (
		<div className="tiqqun-ai container">
			<Navbar />
			{loading ? (
				<Loading />
			) : error ? (
				<Error setError={setError} />
			) : (
				<TweetList tweetlist={tweetlist} setDetail={setDetail} />
			)}
			<Detail detail={detail} setDetail={setDetail} />
			<button className="secondary" onClick={fetchTweets}>
				Fetch Tweets
			</button>
		</div>
	)
}

export default App
