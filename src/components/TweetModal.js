import { useState, useRef } from "react"
import Modal from "./Modal"
import ModalFooter from "./ModalFooter"

import { ReactComponent as Twitter } from "../assets/img/twitter.svg"
import { ReactComponent as X } from "../assets/img/x.svg"
import { ReactComponent as Edit } from "../assets/img/edit-2.svg"
import { ReactComponent as Trash } from "../assets/img/trash-2.svg"

const TweetModal = props => {
	const {
		index,
		removeFromChoices,
		tweet,
		setTweet,
		isOpen,
		toggleModal,
		postToTwitter
	} = props

	const [edit, setEdit] = useState(false)

	const taRef = useRef(null)

	const handleChange = e => setTweet(e.target.value)

	const handleSubmit = () => {
		postToTwitter(tweet)
		setEdit(false)
		toggleModal(false)
	}
	const handleEdit = () => {
		setEdit(true)
		taRef.current.focus()
	}

	const handleClose = () => {
		toggleModal(false)
		setEdit(false)
		setTweet("")
	}
	const handleRemove = () => {
		removeFromChoices(index)
		handleClose()
	}

	return (
		<Modal isOpen={isOpen} toggleModal={toggleModal}>
			<div>
				<X
					width={20}
					style={{
						display: "block",
						marginLeft: "auto",
						marginBottom: "1em"
					}}
					onClick={handleClose}
				/>
			</div>
			{edit ? (
				<textarea
					ref={taRef}
					rows={5}
					maxLength={280}
					value={tweet}
					onChange={handleChange}
				/>
			) : (
				<p ref={taRef}>{tweet}</p>
			)}
			<ModalFooter>
				<p>Post to Twitter?</p>
				<Twitter onClick={handleSubmit} />
				<Edit onClick={handleEdit} />
				<Trash onClick={handleRemove} />
			</ModalFooter>
		</Modal>
	)
}

export default TweetModal
