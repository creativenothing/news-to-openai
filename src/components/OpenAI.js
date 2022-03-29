import { useState } from 'react'
import axios from 'axios'

import TweetModal from './TweetModal'
import TwitterCard from './TwitterCard'

const EmptyResults = props => {
  return (
    <section id="empty-results">
      <p>
        You have not generated any tweets yet. View{' '}
        <a href="/headlines">headlines</a> to generate a list of potential
        tweets, and then they will appear here.
      </p>
    </section>
  )
}

const OpenAI = props => {
  const [showModal, setShowModal] = useState(false)
  const [tweet, setTweet] = useState('')
  const [index, setIndex] = useState(null)
  const [metadata, setMetadata] = useState({})
  const { article, choices, removeFromChoices } = props

  if (choices.length < 1) return <EmptyResults />

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
  return (
    <section id="results">
      <TwitterCard
        title={article.title}
        description={article.content}
        urlToImage={article.urlToImage}
        sourceName={article.source.name}
      />
      {choices.map((c, i) => (
        <div className="choice" key={i} onClick={() => openTweetDetail(i)}>
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
    </section>
  )
}

export default OpenAI
