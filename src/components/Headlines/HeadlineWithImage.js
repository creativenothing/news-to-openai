import { findElapsedTime } from '../../utils/findElapsedTime'

const dark = window.matchMedia('(prefers-color-scheme: dark)').matches

const Headline = props => {
  const { article, sendSeed, newslist } = props
  return (
    <article
      className="headline"
      key={article.publishedAt}
      style={{ color: dark ? '#bbc6ce' : '#415462' }}
    >
      <div className="main">
        <img src={article.urlToImage} alt="" />
        <div>
          <h6>{article.source.name}</h6>
          <p>{article.title}</p>
        </div>
      </div>
      <div className="info">
        <small>{findElapsedTime(article.publishedAt)}</small>
        <span role="button" className="contrast outline">
          <small onClick={e => sendSeed(article.title)}> generate tweets</small>
        </span>
      </div>
    </article>
  )
}

export default Headline
