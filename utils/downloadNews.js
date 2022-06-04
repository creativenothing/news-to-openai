/*
 *  This is a back-end utility function for downloading and saving
 *  news results from the https://newsapi.org API.
 *
 *  To run: first, export the API key to the environment:
 *
 *     export REACT_APP_NEWSAPI_KEY=<key goes here>
 *
 *  the key can be found in .env
 */
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const slugify = require('react-slugify').default

const NEWS_API_PATH = 'https://newsapi.org/v2/top-headlines'
const NEWSAPI_KEY = process.env.NEWSAPI_KEY

const sources =
  'abc-news,al-jazeera-english,associated-press,axios,bbc-news,breitbart,cbc-news,cnn,fox-news,google-news,msnbc,national-review,nbc-news,newsweek,politico,reuters,the-american-conservative,the-hill,the-washington-post,usa-today,vice-news'

const headers = { 'x-api-key': NEWSAPI_KEY }

const defaultParams = {
  language: 'en',
  sources,
  pageSize: 100
}

const DATADIR = path.resolve(__dirname, '../data/news/')
const NEWSFILEPATH =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '../build/news.json')
    : path.resolve(__dirname, '../public/news.json')
let id = fs.readdirSync(DATADIR).length + 1

console.log('data directory: ' + DATADIR)
console.log('newsfile path: ' + NEWSFILEPATH)
console.log('number of existing articles: ' + id)

const fetchMetadata = article => {
  const url = article.url
  return axios
    .post('http://localhost:5000/twitter/meta', { url })
    .then(({ data }) => {
      const { title, description } = data
      article.title = title
      article.description = description
      return article
    })
    .catch(e => article)
}

const fetchHeadlinesDebug = () => {
  const response = JSON.parse(
    fs.readFileSync(path.resolve('./', 'response.json'))
  )
  console.log('opened ' + response.articles.length + ' articles.')
  return new Promise((resolve, reject) => {
    return response.articles
  })
}

const fetchHeadlines = sentParams => {
  const params = { ...defaultParams, ...sentParams }
  console.log('Fetching headlines from ' + NEWS_API_PATH)
  return axios
    .get(NEWS_API_PATH, { headers, params })
    .then(({ data }) => {
      console.log('Retrieved ' + data.articles.length + ' articles. ')
      return data.articles
    })
    .catch(err => console.log(err.message))
}

const saveArticle = article => {
  fetchMetadata(article)
    .then(newArticle => {
      newArticle.id = id
      id++
      const slug = slugify(newArticle.title)
      const filepath = path.resolve(DATADIR, slug + '.json')
      fs.writeFileSync(filepath, JSON.stringify(newArticle))
    })
    .catch(err => console.log(err.message))
}

const downloadAllHeadlines = () =>
  fetchHeadlines()
    .then(articles => articles)
    .catch(err => console.log(err.message))

const saveAllArticles = articles =>
  new Promise(resolve => resolve(articles.forEach(a => saveArticle(a))))

writeNewsFileFromDir = () => {
  const filenames = fs.readdirSync(DATADIR)
  const articles = filenames
    .map(filename => fs.readFileSync(DATADIR + '/' + filename).toString())
    .join(',')
  console.log(
    'Writing ' + filenames.length + ' articles to ' + NEWSFILEPATH + '.'
  )
  fs.writeFileSync(NEWSFILEPATH, '[')
  fs.writeFileSync(NEWSFILEPATH, articles, { flag: 'a' })
  fs.writeFileSync(NEWSFILEPATH, ']', { flag: 'a' })
}

const fixIds = () => {
  let iter = 1
  const filenames = fs.readdirSync(DATADIR)
  const articles = filenames
    .map(filename => JSON.parse(fs.readFileSync(DATADIR + '/' + filename)))
    .map(a => {
      a.id = iter
      iter++
      return JSON.stringify(a)
    })
    .join(',')
  fs.writeFileSync(NEWSFILEPATH, '[')
  fs.writeFileSync(NEWSFILEPATH, articles, { flag: 'a' })
  fs.writeFileSync(NEWSFILEPATH, ']', { flag: 'a' })
}

downloadAllHeadlines().then(articles => {
  saveAllArticles(articles).then(() => writeNewsFileFromDir())
})
