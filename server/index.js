const express = require('express')
const passport = require('passport')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')

const twitter = require('./routes/twitter')

const port = process.env.PORT

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.use('/twitter', twitter)

app.listen(port, () => {
  console.log(`l337 haxing happening on port ${port}`)
})

module.exports = app
