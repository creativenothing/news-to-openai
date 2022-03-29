import findElapsedTime from '../../utils/findElapsedTime'

const Headline = props => {
  const { article, sendSeed } = props
  return (
    <div className="headline" key={article.publishedAt}>
      <div className="main">
        <div>
          <span>
            <h6>{article.source.name}</h6>
          </span>
          <p>{article.title}</p>
        </div>
      </div>
      <div className="info">
        <small>{findElapsedTime(article.publishedAt)}</small>
        <span onClick={() => sendSeed(article.title)}>
          <small>generate tweets</small>
        </span>
      </div>
    </div>
  )
}

export default Headline
