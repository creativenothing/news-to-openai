import { useState } from 'react'
import Modal from './Modal'
import TwitterCard from './TwitterCard'

import { ReactComponent as Twitter } from '../assets/img/twitter.svg'
import { ReactComponent as X } from '../assets/img/x.svg'
import { ReactComponent as Edit } from '../assets/img/edit-2.svg'
import { ReactComponent as Trash } from '../assets/img/trash-2.svg'
const TweetModal = props => {
  const {
    index,
    removeFromChoices,
    tweet,
    setTweet,
    isOpen,
    toggleModal,
    postToTwitter,
    article,
    metadata
  } = props

  const [edit, setEdit] = useState(false)

  const handleChange = e => setTweet(e.target.value)
  const handleSubmit = () => {
    const tweetAndUrl = `${tweet}\n\n${article.url}`
    postToTwitter(tweetAndUrl)
    setEdit(false)
    toggleModal(false)
  }
  const handleEdit = () => {
    setEdit(true)
  }

  const handleClose = () => {
    toggleModal(false)
    setEdit(false)
    setTweet('')
  }
  const handleRemove = () => {
    removeFromChoices(index)
    handleClose()
  }

  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal}>
      <div className="twitter-modal">
        <header>
          <X className="close" width={20} onClick={handleClose} />
        </header>
        {edit ? (
          <textarea
            rows={5}
            maxLength={280}
            value={tweet}
            onChange={handleChange}
          />
        ) : (
          <p className="tweet">{tweet}</p>
        )}
        <a
          className="link"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer">
          {article.url}
        </a>
        <TwitterCard
          urlToImage={article.urlToImage}
          sourceName={article.source.name}
          title={metadata.title}
          description={metadata.description}
        />
        <div className="buttons">
          <Twitter onClick={handleSubmit} />
          <Edit onClick={handleEdit} />
          <Trash onClick={handleRemove} />
        </div>
      </div>
    </Modal>
  )
}

export default TweetModal
