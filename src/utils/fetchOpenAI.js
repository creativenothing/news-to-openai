import axios from 'axios'
import openairequest from '../data/openairequest.json'

const OPENAI_API_PATH =
  'https://api.openai.com/v1/engines/text-davinci-001/completions'

const data = {
  max_tokens: 100,
  temperature: 0.6,
  n: 10,
  echo: false
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + process.env.REACT_APP_OPENAPI_KEY
}
const config = { headers }

const fetchOpenAIProd = seed => {
  const twitterPrompt =
    'I saw a news headline today that said: "' +
    seed +
    '." So I wrote a funny tweet about it that said: '
  return axios
    .post(OPENAI_API_PATH, { prompt: twitterPrompt, ...data }, config)
    .then(res => res)
    .catch(error => ({ data: null, error }))
}

const fetchOpenAIDev = () =>
  new Promise(resolve => resolve({ data: openairequest }))

const fetchOpenAI = fetchOpenAIProd

export default fetchOpenAI
