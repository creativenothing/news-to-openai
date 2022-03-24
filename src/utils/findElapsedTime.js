const findElapsedTime = dateString => {
  const now = new Date()
  const pubdate = new Date(dateString)
  const diff = now.getTime() - pubdate.getTime()
  const minutes = Math.round(diff / 1000 / 60)
  const hours = Math.round(diff / 1000 / 60 / 60)
  const days = Math.round(diff / 1000 / 60 / 60 / 24)
  const weeks = Math.round(diff / 1000 / 60 / 60 / 24 / 7)
  const months = Math.round(diff / 1000 / 60 / 60 / 24 / 7 / 30)
  return minutes < 60
    ? minutes === 1
      ? minutes + ' minute ago'
      : minutes + ' minutes ago'
    : hours < 24
    ? hours === 1
      ? hours + ' hour ago'
      : hours + ' hours ago'
    : days < 7
    ? days === 1
      ? days + ' day ago'
      : days + ' days ago'
    : weeks < 4
    ? weeks === 1
      ? weeks + ' week ago'
      : weeks + ' weeks ago'
    : months < 12
    ? months === 1
      ? months + ' month ago'
      : months + ' months ago'
    : pubdate
}

export default findElapsedTime
