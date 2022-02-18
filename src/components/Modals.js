import React, { useState, useEffect, useRef } from "react"

import { ReactComponent as Twitter } from "../img/twitter.svg"
import { ReactComponent as X } from "../img/x.svg"
import { ReactComponent as Edit } from "../img/edit-2.svg"

const dark = window.matchMedia("(prefers-color-scheme: dark)").matches

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
		<dialog ref={dialogRef} style={{ overflow: "hidden" }}>
			<article ref={articleRef} style={{ width: "90%" }}>
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
	const { newslist, sendSeed } = props
	return (
		<ul className="list">
			{newslist.map((n, i) => (
				<li
					className="listitem"
					key={i}
					style={{ minHeight: "5em", color: dark ? "#bbc6ce" : "#415462" }}
					onClick={e => sendSeed(e.target.innerText)}
				>
					{n.title}
				</li>
			))}
		</ul>
	)
}

const TweetList = ({ tweetlist, setTweet, toggleModal }) => {
	const openModal = tweet => {
		setTweet(tweet)
		toggleModal(true)
	}
	return (
		<ul className="list">
			{tweetlist.map((t, i) => (
				<li
					className="listitem"
					key={i}
					style={{ color: dark ? "#bbc6ce" : "#415462" }}
					onClick={e => openModal(e.target.innerText)}
				>
					{t}
				</li>
			))}
		</ul>
	)
}

export { Modal, ModalFooter, NewsModal, TweetModal, NewsList, TweetList }
