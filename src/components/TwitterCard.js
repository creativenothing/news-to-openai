const TwitterCard = props => {
  const { urlToImage, sourceName, title, description } = props
  return (
    <div className="twitter-card">
      <img src={urlToImage} alt="" />
      <div className="text">
        <small>{sourceName}</small>
        <div className="title">{title}</div>
        <p className="description">{description}</p>
      </div>
    </div>
  )
}

export default TwitterCard
