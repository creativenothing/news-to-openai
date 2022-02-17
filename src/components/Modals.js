import React, { useState, useEffect, useRef } from "react"

import { ReactComponent as Twitter } from "../img/twitter.svg"
import { ReactComponent as X } from "../img/x.svg"
import { ReactComponent as Edit } from "../img/edit-2.svg"

const Modal = props => {
	const { isOpen, toggleModal } = props
	const dialogRef = useRef(null)
	const articleRef = useRef(null)

	const click = e => {
		if (!articleRef.current.contains(e.target)) {
			closeModal()
		}
	}

	useEffect(() => {
		if (!dialogRef.current.open && isOpen) {
			dialogRef.current.showModal()
			document.addEventListener("mousedown", click)
		}
		if (dialogRef.current.open && !isOpen) {
			closeModal()
		}
	})

	const closeModal = () => {
		document.removeEventListener("mousedown", click)
		dialogRef.current.close()
		toggleModal(false)
	}

	return (
		<dialog ref={dialogRef}>
			<article ref={articleRef} style={{ width: "80%" }}>
				{props.children}
			</article>
		</dialog>
	)
}

const ModalFooter = props => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-around",
				marginTop: "3rem",
				paddingTop: "1rem",
				borderTop: "1px solid grey"
			}}
		>
			{props.children}
		</div>
	)
}

const NewsModal = props => {
	const { isOpen, toggleModal } = props
	return (
		<Modal isOpen={isOpen} toggleModal={toggleModal}>
			<NewsList {...props} />
			<ModalFooter>
				<X onClick={() => toggleModal(false)} />
			</ModalFooter>
		</Modal>
	)
}
const TweetModal = props => {
	const { tweet, setTweet, isOpen, toggleModal } = props
	return (
		<Modal isOpen={isOpen} toggleModal={toggleModal}>
			<p>{tweet}</p>
			<ModalFooter>
				<Twitter onClick={() => alert("You posted to twitter.")} />
				<Edit />
				<X onClick={() => toggleModal()} />
			</ModalFooter>
		</Modal>
	)
}

const NewsList = props => {
	const { newslist } = props
	return (
		<ul>
			{newslist.map((n, i) => (
				<li key={i}>{n.title}</li>
			))}
		</ul>
	)
}

const TweetList = ({ tweetlist, setTweet }) => {
	return (
		<ul>
			{tweetlist.map((t, i) => (
				<li key={i} onClick={e => setTweet(e.target.innerText)}>
					{t}
				</li>
			))}
		</ul>
	)
}

export { Modal, ModalFooter, NewsModal, TweetModal, NewsList, TweetList }
