import Modal from "./Modal"
import ModalFooter from "./ModalFooter"

import { ReactComponent as Twitter } from "../assets/img/twitter.svg"
import { ReactComponent as X } from "../assets/img/x.svg"
import { ReactComponent as Edit } from "../assets/img/edit-2.svg"

const TweetModal = props => {
	const { tweet, setTweet, isOpen, toggleModal } = props
	return (
		<Modal isOpen={isOpen} toggleModal={toggleModal}>
			<p>{tweet}</p>
			<ModalFooter>
				<Twitter onClick={() => alert("You posted to twitter.")} />
				<Edit />
				<X onClick={() => toggleModal(false)} />
			</ModalFooter>
		</Modal>
	)
}

export default TweetModal
