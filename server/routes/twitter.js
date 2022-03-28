const router = require('express').Router()
const { TwitterApi } = require('twitter-api-v2')
const axios = require('axios')
const cheerio = require('cheerio')
const appKey = process.env.appKey
const appSecret = process.env.appSecret
const accessToken = process.env.accessToken
const accessSecret = process.env.accessTokenSecret

const buildClient = () =>
  new TwitterApi({
    appKey,
    appSecret,

    accessToken,
    accessSecret
  })

const client = buildClient()
router.get('/', (req, res) => {
  client.v2
    .me()
    .then(resp => res.send(resp))
    .catch(err => console.log(err))
})
router.post('/', (req, res) => {
  const { tweet } = req.body
  client.v2
    .tweet(tweet)
    .then(({ data }) => {
      res.json(data)
    })
    .catch(err => console.log(err))
})

router.post('/meta', (req, res) => {
  const { url } = req.body

  axios
    .get(url)
    .then(({ data }) => {
      const $ = cheerio.load(data)
      const title =
        $('meta[property="og:title"]').attr('content') ||
        $('title').text() ||
        $('meta[name="title"]').attr('content')
      const description =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content')
      console.log(title)
      console.log(description)
      res.json({ title, description })
    })
    .catch(err => console.log(err))
})
module.exports = router
