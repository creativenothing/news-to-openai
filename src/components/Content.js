import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Home'
import Error from './Error'
import Headlines, { HeadlineFilter } from './Headlines'
import OpenAI from './OpenAI'
import Loading from './Loading'
import { fetchNews, sortByDate, fetchOpenAI } from '../utils'

const Content = props => {
  const [loading, setLoading] = useState(false)
  const [newslist, setNewslist] = useState([])
  const [seed, setSeed] = useState('')
  const [choices, setChoices] = useState([])
  const [filters, setFilters] = useState({ keywords: [] })

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetchNews().then(newslist => {
      setNewslist(sortByDate(newslist))
      setLoading(false)
    })
  }, [setLoading])

  const handleError = err => {
    navigate('/error')
    console.log(err)
  }
  const sendSeed = seed => {
    setSeed(seed)
    setLoading(true)
    fetchOpenAI(seed).then(({ data, error }) => {
      if (error) handleError(error)
      else {
        setChoices(
          data.choices.map(c => ({ text: c.text.trim(), index: c.index }))
        )
        navigate('/results')
        setLoading(false)
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
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        path="/headlines"
        element={
          <Headlines
            headlineFilter={headlineFilter}
            newslist={filter(newslist)}
            sendSeed={sendSeed}
            loading={loading}
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
            loading={loading}
          />
        }
      />
      <Route path="/error" element={<Error />} />
      <Route path="/loading" element={<Loading />} />
    </Routes>
  )
}
export default Content
