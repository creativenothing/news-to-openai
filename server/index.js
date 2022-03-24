const express = require('express')
const passport = require('passport')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')

const authRouter = require('./routes/auth')
const port = 5000
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
    cookie: { secure: false },
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
)
app.use('/', authRouter)

app.listen(port, () => {
  console.log(`l337 haxing happening on port ${port}`)
})

module.exports = app
