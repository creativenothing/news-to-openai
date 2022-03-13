var express = require("express")
var passport = require("passport")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var authRouter = require("./routes/auth")
var port = 5000
var app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
// session setup
//
// This sequence of middleware is necessary for login sessions.  The first
// middleware loads session data and makes it available at `req.session`.  The
// next lines initialize Passport and authenticate the request based on session
// data.  If session data contains a logged in user, the user is set at
// `req.user`.
app.use(
	require("express-session")({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false }
	})
)
app.use(passport.initialize())
app.use(passport.session())

app.use("/", authRouter)
app.get("/test-backend", (req, res) => res.json({ data: "hello, world" }))
app.listen(port, () => {
	console.log(`l337 haxing happening on port ${port}`)
})
module.exports = app
