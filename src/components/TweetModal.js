import Modal from './Modal'
import TwitterCard from './TwitterCard'

import { ReactComponent as Yes } from '../assets/img/check-circle.svg'
import { ReactComponent as No } from '../assets/img/x-circle.svg'

const TweetModal = props => {
  const {
    tweet,
    isOpen,
    closeModal,
    postToTwitter,
    article,
    metadata,
    stat,
    clearState
  } = props

  return (
    <Modal className={'tweet-modal'} isOpen={isOpen} closeModal={closeModal}>
      <div className="tweet">
        <p>{tweet}</p>
        <p>
          <a
            className="link"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer">
            {article.url}
          </a>
        </p>
        <p />
      </div>
      <TwitterCard
        urlToImage={article.urlToImage}
        sourceName={article.source.name}
        title={metadata.title}
        description={metadata.description}
      />
      <footer>
        {stat === 'success' || stat === 'fail' ? (
          <SuccessOrFail
            success={stat === 'success'}
            link={metadata.link}
            handleClose={stat === 'success' ? clearState : closeModal}
          />
        ) : (
          <PostOrDelete postToTwitter={postToTwitter} closeModal={closeModal} />
        )}
      </footer>
    </Modal>
  )
}

const PostOrDelete = props => {
  const { postToTwitter, closeModal } = props

  return (
    <div className="buttons">
      <p>Post to Twitter?</p>
      <Yes onClick={postToTwitter} />
      <No onClick={closeModal} />
    </div>
  )
}

const SuccessOrFail = props => {
  const { success, handleClose, link } = props
  return (
    <div className="buttons">
      {success ? (
        <p>
          Success!{' '}
          <a href={link} target="_blank" rel="noopener noreferrer">
            View tweet
          </a>
          .
        </p>
      ) : (
        <p> Something went wrong. Try again later.</p>
      )}
      <No onClick={handleClose} />
    </div>
  )
}

export default TweetModal
