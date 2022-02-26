import { TwitterApi } from "twitter-api-v2"

const appKey = process.env.REACT_APP_TWITTER_APPKEY
const appSecret = process.env.REACT_APP_TWITTER_APPSECRET

// following will be needed for oauth
//const accessToken = process.env.REACT_APP_TWITTER_ACCESSTOKEN
//const accessSecret = process.env.REACT_APP_TWITTER_ACCESSSECRET

const config = { appKey, appSecret }
const client = new TwitterApi()
