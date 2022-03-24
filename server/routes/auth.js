const express = require('express')
const passport = require('passport')
const clientID = process.env.CLIENT_ID
const router = express.Router()
const clientSecret = process.env.CLIENT_SECRET
const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET
const TwitterStrategy = require('@superfaceai/passport-twitter-oauth2')
const callbackURL = 'http://localhost:3000/auth/twitter/callback'

passport.use(
  new TwitterStrategy(
    { clientID, clientSecret, consumerKey, consumerSecret, callbackURL },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile, { tokens: { accessToken, refreshToken } })
    }
  )
)
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

router.get('/login', (req, res, next) => res.json({ login: 'yes' }))

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

router.get(
  '/auth/twitter',
  passport.authenticate('twitter', {
    scope: ['tweet.read', 'tweet.write', 'users.read'],
  })
)

router.get('/auth/me', (req, res) => {
  res.json(req.session)
})

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/',
  }),
  (req, res) => {
    const user = req.user
    req.login(user, err => {
      if (err) return next(err)
    })
    res.redirect('/')
  }
)
module.exports = router
