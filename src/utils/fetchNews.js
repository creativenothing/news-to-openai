const axios = require('axios')

const sortByDate = newslist =>
  newslist
    .map(n => {
      n.date = new Date(n.publishedAt)
      return n
    })
    .sort((a, b) => b.date - a.date)

const fetchNews = () =>
  axios
    .get('/news.json')
    .then(({ data }) => sortByDate(data))
    .catch(e => console.log(e))

module.exports = fetchNews
