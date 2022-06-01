import React, { useState } from 'react'
import Headline from './Headline'
import Loading from '../Loading'
import { ReactComponent as X } from '../../assets/img/x.svg'

const SearchBar = props => {
  const { handleChange, handleSubmit, search } = props

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="filter by keyword(s)"
      />
    </form>
  )
}

const HeadlineFilter = props => {
  const { loading, filterByKeywords } = props
  const [keywords, setKeywords] = useState([])
  const [search, setSearch] = useState('')

  const handleChange = e => setSearch(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    const keywordArray = search.toLowerCase().replace(',', ' ').split(' ')
    setKeywords(keywordArray)
    filterByKeywords(keywordArray)
    setSearch('')
  }
  const removeKeyword = keyword => {
    const newKeywords = [...keywords].filter(k => k !== keyword)
    filterByKeywords(newKeywords)
    setKeywords(newKeywords)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <SearchBar
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {keywords.map(k => (
        <span
          role="button"
          className="secondary outline"
          key={k}
          onClick={() => removeKeyword(k)}>
          {k}
          <X />
        </span>
      ))}
    </div>
  )
}

const Headlines = props => {
  const { loading, newslist, headlineFilter } = props
  if (loading) return <Loading />

  return (
    <React.Fragment>
      <div id="headlines">
        {headlineFilter}
        {newslist.map(n => (
          <Headline key={n.id} article={n} {...props} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default Headlines

export { HeadlineFilter }
