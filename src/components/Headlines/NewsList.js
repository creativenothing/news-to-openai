const NewsList = props => {
  const { newslist, sendSeed } = props
  return (
    <ul
      className="list"
      style={{
        overflow: 'auto'
      }}
    >
      {newslist.map((n, i) => (
        <li
          className="listitem"
          key={i}
          style={{ minHeight: '5em', color: dark ? '#bbc6ce' : '#415462' }}
          onClick={e => sendSeed(e.target.innerText)}
        >
          {n.title}
        </li>
      ))}
    </ul>
  )
}

export default Newslist
