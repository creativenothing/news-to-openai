import { useState, useRef, Fragment } from 'react'
import axios from 'axios'

import TweetModal from './TweetModal'
import TwitterCard from './TwitterCard'
import { ReactComponent as Twitter } from '../assets/img/twitter.svg'
import { ReactComponent as Trash } from '../assets/img/trash-2.svg'

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

const Result = props => {
  const { result, openTweetDetail, removeFromChoices } = props
  return (
    <div className="result">
      <p>{result.text}</p>
      <div>
        <div className="buttons">
          <span
            role="button"
            className="tweet"
            onClick={() => openTweetDetail(result.index)}>
            <Twitter />
          </span>
          <span
            role="button"
            className="remove"
            onClick={() => removeFromChoices(result.index)}>
            <Trash />
          </span>
        </div>
      </div>
    </div>
  )
}
const OpenAI = props => {
  const [showModal, setShowModal] = useState(false)
  const [stat, setStat] = useState('unsent')
  const [tweet, setTweet] = useState('')
  const [index, setIndex] = useState(null)
  const [metadata, setMetadata] = useState({})
  const secRef = useRef(null)

  const { article, choices, removeFromChoices } = props

  if (choices.length < 1) return <EmptyResults />

  const fetchMetadata = url =>
    axios.post('/twitter/meta', { url }).then(({ data }) => data)

  const aniTime = 400

  const openModal = () => {
    secRef.current.classList.add('modal-is-opening')
    setTimeout(
      () => secRef.current.classList.remove('modal-is-opening'),
      aniTime
    )
    setShowModal(true)
  }

  const closeModal = () => {
    secRef.current.classList.add('modal-is-closing')
    setTimeout(() => {
      secRef.current.classList.remove('modal-is-closing')
      setShowModal(false)
    }, aniTime)
  }
  const openTweetDetail = index => {
    const choice = choices.find(c => c.index === index)
    setTweet(choice.text)
    setIndex(choice.index)
    fetchMetadata(article.url).then(res => {
      setMetadata(res)
      openModal()
    })
  }
  const clearState = () => {
    setTweet('')
    setIndex(null)
    setMetadata({})
    setStat('unsent')
    closeModal()
  }
  const postToTwitterDev = tweet => {
    setMetadata({ link: '/', ...metadata })
    setStat('success')
  }
  const postToTwitterProd = tweet => {
    axios
      .post('/twitter', { tweet })
      .then(({ data }) => {
        setMetadata({ link: data.text, ...metadata })
        setStat('success')
      })
      .catch(err => {
        console.log(err)
        setStat('failure')
      })
  }

  const postToTwitter =
    process.env.NODE_ENV === 'production' ? postToTwitterProd : postToTwitterDev
  if (choices.length < 1) return <EmptyResults />
  return (
    <section ref={secRef} id="results">
      <ResultsList
        choices={choices}
        article={article}
        postToTwitter={postToTwitter}
        removeFromChoices={removeFromChoices}
        openTweetDetail={openTweetDetail}
      />
      <TweetModal
        isOpen={showModal}
        closeModal={closeModal}
        tweet={tweet}
        stat={stat}
        article={article}
        metadata={metadata}
        postToTwitter={postToTwitter}
        clearState={clearState}
      />
    </section>
  )
}

const ResultsList = props => {
  const {
    article,
    choices,
    postToTwitter,
    removeFromChoices,
    openTweetDetail
  } = props
  return (
    <Fragment>
      <TwitterCard
        title={article.title}
        description={article.content}
        urlToImage={article.urlToImage}
        sourceName={article.source.name}
      />
      {choices.map((c, i) => (
        <Result
          key={i}
          result={c}
          postToTwitter={postToTwitter}
          removeFromChoices={removeFromChoices}
          openTweetDetail={openTweetDetail}
        />
      ))}
    </Fragment>
  )
}
export default OpenAI
