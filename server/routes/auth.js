var express = require("express")
var passport = require("passport")
const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET
const callbackURL = "http://localhost:5000/auth/twitter/callback"

const TwitterStrategy = require("passport-twitter").Strategy
passport.use(
	new TwitterStrategy(
		{ consumerKey, consumerSecret, callbackURL },
		(accessToken, refreshToken, profile, done) => {
			return done(null, profile)
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
		failureRedirect: "/login"
	}),
	function (req, res, next) {
		console.log(req, res)
		req.login({ user: "me" }, function (err) {
			if (err) {
				return next(err)
			}
			res.redirect("/")
		})
	}
)

router.get("/logout", function (req, res, next) {
	req.logout()
	res.redirect("/")
})

module.exports = router
