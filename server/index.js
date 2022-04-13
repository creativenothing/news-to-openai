const express = require('express')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')

const BUILD_PATH = path.join(__dirname, '..', 'build')
const port = process.env.PORT || 5000

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
)

app.use(cors())

app.use('/twitter', require('./routes/twitter'))

app.use(express.static(BUILD_PATH))

app.get('/*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'))
})

app.listen(port, () => {
  console.log(`l337 haxing happening on port ${port}`)
})

module.exports = app
