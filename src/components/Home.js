import { useNavigate } from 'react-router-dom'

import * as hero from '../assets/img/hero'
import quotes from '../data/quotes.json'

const quote = quotes[Math.floor(Math.random() * quotes.length)]

const Figure = props => {
  const images = Object.keys(hero)
  const selectedImage = hero[images[Math.floor(Math.random() * quotes.length)]]
  return (
    <div id="figure" className="row">
      <div className="col-xs-12 col-sm-3">
        <img src={selectedImage} />
      </div>
      <div className="col-xs-12 col-sm-9">
        <em>{quote}</em>
      </div>
    </div>
  )
}
const Home = props => {
  const navigate = useNavigate()
  return (
    <section id="home">
      <h4>Instructions</h4>
      <p>
        I am a bot that reads current news headlines and generates pithy tweets
        in response.
      </p>
      <p>
        View{' '}
        <a href="#" onClick={() => navigate('/headlines')}>
          headlines
        </a>{' '}
        to generate a selection of tweets from a current news headline.
      </p>
      <p>
        Follow me on twitter:{' '}
        <a href="https://twitter.com/insituationist">@insituationist</a>
      </p>
      <Figure />
    </section>
  )
}

export default Home
