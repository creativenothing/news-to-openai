var express = require("express")
var passport = require("passport")
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET
const TwitterStrategy = require("@superfaceai/passport-twitter-oauth2").Strategy
const callbackURL = "http://127.0.0.1:3000/auth/twitter/callback"
//const OAuth2Strategy = require("passport-oauth2").Strategy
//passport.use(
//	new OAuth2Strategy(
//		{
//			authorizationURL: "https://twitter.com/i/oauth2/authorize",
//			tokenURL: "https://api.twitter.com/oauth2/token",
//			clientID: process.env.CLIENT_ID,
//			clientSecret: process.env.CLIENT_SECRET,
//			callbackURL: "http://localhost:3000/auth/twitter/callback",
//			scope: "tweet.write",
//			state: "state",
//			code_challenge: "challenge",
//			code_challenge_method: "plain"
//		},
//		function (accessToken, refreshToken, profile, cb) {
//			console.log(accessToken, refreshToken, profile, done)
//			return done(null, profile, { tokens: { accessToken, refreshToken } })
//		}
//	)
//)
//const TwitterStrategy = require("passport-twitter").Strategy
passport.use(
	new TwitterStrategy(
		{ clientID, clientSecret, consumerKey, consumerSecret, callbackURL },
		(accessToken, refreshToken, profile, done) => {
			console.log(accessToken, refreshToken, profile, done)
			return done(null, profile, { tokens: { accessToken, refreshToken } })
		}
	)
)
var router = express.Router()

router.get("/login", function (req, res, next) {
	res.json({ login: "yes" })
})

router.get("/auth/twitter", passport.authenticate("twitter"))

router.get(
	"/auth/twitter/callback",
	passport.authenticate("twitter", {
		failureRedirect: "/",
		scope: ["tweet.read", "tweet.write", "users.read"]
	}),
	function (req, res) {
		console.log(req, res)
		// Successful authentication, redirect home.
		res.redirect("/")
	}
)
router.get("/logout", function (req, res, next) {
	req.logout()
	res.redirect("/")
})

module.exports = router
