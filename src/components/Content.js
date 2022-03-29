import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Home'
import Headlines, { HeadlineFilter } from './Headlines'
import OpenAI from './OpenAI'
import { fetchNews, sortByDate, fetchOpenAI } from '../utils'

const Loading = () => {
  return (
    <div className="loading">
      <div className="sk-bounce sk-center">
        <div className="sk-bounce-dot"></div>
        <div className="sk-bounce-dot"></div>
      </div>
    </div>
  )
}

const Error = props => {
  const { setComponent } = props
  return (
    <dialog open>
      <article>
        <div
          aria-label="Close"
          className="close"
          onClick={() => setComponent('home')}></div>
        <p>Something went wrong. Please try again.</p>
      </article>
    </dialog>
  )
}

const Content = props => {
  const [newslist, setNewslist] = useState([])
  const [seed, setSeed] = useState('')
  const [choices, setChoices] = useState([])
  const [filters, setFilters] = useState({ keywords: [] })
  const navigate = useNavigate()

  useEffect(() => {
    fetchNews().then(newslist => setNewslist(sortByDate(newslist)))
  }, [])

  const handleError = err => {
    navigate('/error')
    console.log(err)
  }
  const sendSeed = seed => {
    setSeed(seed)
    navigate('/loading')
    fetchOpenAI(seed).then(({ data, error }) => {
      if (error) handleError(error)
      else {
        setChoices(
          data.choices.map(c => ({ text: c.text.trim(), index: c.index }))
        )
        navigate('/results')
      }
    })
  }
  const filterByKeywords = keywords => {
    const filteredNews = [...newslist].filter(
      n =>
        !n.description ||
        keywords.some(word => !n.description.toLowerCase().includes(word))
    )
    const filterIds = filteredNews.map(n => n.id)
    setFilters({ keywords: filterIds })
  }
  const filter = newslist =>
    [...newslist].filter(n => !filters.keywords.includes(n.id))

  const clearFilter = () => setFilters({ keywords: [] })

  const removeFromChoices = index =>
    setChoices(choices.filter(c => c.index !== index))

  const headlineFilter = (
    <HeadlineFilter
      filterByKeywords={filterByKeywords}
      clearFilter={clearFilter}
    />
  )
  return (
    <div className="content">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/headlines"
          element={
            <Headlines
              headlineFilter={headlineFilter}
              newslist={filter(newslist)}
              sendSeed={sendSeed}
            />
          }
        />
        <Route
          path="/results"
          element={
            <OpenAI
              article={newslist.find(n => n.title === seed)}
              seed={seed}
              choices={choices}
              removeFromChoices={removeFromChoices}
            />
          }
        />
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  )
}
export default Content
