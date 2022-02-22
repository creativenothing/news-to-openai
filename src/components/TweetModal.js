import Modal from "./Modal"
import ModalFooter from "./ModalFooter"

import { ReactComponent as Twitter } from "../assets/img/twitter.svg"
import { ReactComponent as X } from "../assets/img/x.svg"
import { ReactComponent as Edit } from "../assets/img/edit-2.svg"

const TweetModal = props => {
	const { tweet, setTweet, isOpen, toggleModal, postToTwitter } = props

	const handleChange = e => setTweet(e.target.value)

	return (
		<Modal isOpen={isOpen} toggleModal={toggleModal}>
			<form>
				<textarea
					rows={5}
					maxLength={280}
					value={tweet}
					onChange={handleChange}
				/>
			</form>
			<ModalFooter>
				<Twitter onClick={postToTwitter} />
				<X onClick={() => toggleModal(false)} />
			</ModalFooter>
		</Modal>
	)
}

export default TweetModal
