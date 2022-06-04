const TwitterCard = props => {
  const { url, urlToImage, sourceName, title, description } = props

  const openUrl = () => window.open(url, '_blank').focus()

  return (
    <div className="twitter-card" onClick={openUrl}>
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
