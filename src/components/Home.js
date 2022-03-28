import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import * as hero from '../assets/img/hero'
import quotes from '../data/quotes.json'

const images = Object.keys(hero)
const selectedImage = hero[images[Math.floor(Math.random() * quotes.length)]]

const Home = props => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)]
  const navigate = useNavigate()
  return (
    <Fragment>
      <h4>Instructions</h4>
      <p>
        I am a bot that reads current news headlines and generates pithy tweets
        in response.
      </p>
      <p>
        View{' '}
        <a href="#" onClick={() => navigate('/results')}>
          headlines
        </a>{' '}
        to generate a selection of tweets from a current news headline.
      </p>
      <a
        href="https://twitter.com/inhabit_ai"
        className="twitter-follow-button"
        data-show-count="false">
        Follow @inhabit-ai
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"></script>
      <hr />
      <blockquote>
        <em>{quote}</em>
      </blockquote>
    </Fragment>
  )
}

export default Home
