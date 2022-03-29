import findElapsedTime from '../../utils/findElapsedTime'

const Headline = props => {
  const { article, sendSeed } = props
  return (
    <div className="headline" key={article.publishedAt}>
      <h6>{article.source.name}</h6>
      <p>{article.title}</p>
      <div className="info">
        <small>{findElapsedTime(article.publishedAt)}</small>
        <span
          style={{ textDecoration: 'underline' }}
          onClick={() => sendSeed(article.title)}>
          <small>generate tweets</small>
        </span>
      </div>
    </div>
  )
}

export default Headline
