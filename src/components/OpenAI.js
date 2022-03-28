import { Fragment, useState } from 'react'
import axios from 'axios'
import TweetModal from './TweetModal'
import { findElapsedTime } from '../utils'

import { ReactComponent as Twitter } from '../assets/img/twitter.svg'

const dark = window.matchMedia('(prefers-color-scheme: dark)').matches

const EmptyResults = props => {
  return (
    <div>
      <p>
        You have not generated any tweets, yet. When you do, they will appear
        here.
      </p>
    </div>
  )
}

const OpenAIHeadline = props => {
  const { article } = props
  return (
    <div
      className="headline"
      style={{
        backgroundColor: dark ? '#11191f' : '#fff'
      }}>
      <div className="main">
        <div>
          <h6>{article.source.name}</h6>
          <p>{article.title}</p>
        </div>
      </div>
      <div className="info">
        <small>{findElapsedTime(article.publishedAt)}</small>
      </div>
    </div>
  )
}

const OpenAI = props => {
  const [showModal, setShowModal] = useState(false)
  const [tweet, setTweet] = useState('')
  const [index, setIndex] = useState(null)
  const [metadata, setMetadata] = useState({})

  const { article, choices, removeFromChoices } = props

  const fetchMetadata = url =>
    axios.post('/twitter/meta', { url }).then(({ data }) => data)

  const openTweetDetail = index => {
    const choice = choices.find(c => c.index === index)
    setTweet(choice.text)
    setIndex(choice.index)
    fetchMetadata(article.url).then(res => {
      setMetadata(res)
      setShowModal(true)
    })
  }

  const postToTwitter = tweet => {
    axios
      .post('/twitter', { tweet })
      .then(({ data }) => {
        setShowModal(false)
        alert('You posted to twitter:\n\n' + data.text)
      })
      .catch(err => console.log(err))
  }

  if (choices.length < 1) return <EmptyResults />

  return (
    <Fragment>
      <div className="content-header">
        <OpenAIHeadline article={article} />
      </div>
      {choices.map((c, i) => (
        <div key={i} className="tweet" onClick={() => openTweetDetail(i)}>
          <div>
            <Twitter />
          </div>
          {c.text}
        </div>
      ))}
      <TweetModal
        isOpen={showModal}
        toggleModal={setShowModal}
        tweet={tweet}
        index={index}
        setTweet={setTweet}
        article={article}
        metadata={metadata}
        postToTwitter={postToTwitter}
        removeFromChoices={removeFromChoices}
      />
    </Fragment>
  )
}

export default OpenAI
export { OpenAIHeadline }
