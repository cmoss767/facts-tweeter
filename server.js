import express from 'express'
import { TwitterApi } from 'twitter-api-v2'
import axios from 'axios'
import 'dotenv/config'

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const app = express()

app.post('/twitter', async (req, res) => {
  try {
    const { data } = await axios.get(process.env.FACTS_API_URl, {
      headers: {
        'X-Api-Key': process.env.FACTS_API_KEY,
      },
    })
    const tweet = await client.v2.tweet(data[0].fact)
    return res.json({ message: 'tweet was posted' })
  } catch (error) {
    return res.status(500).json({ message: 'error posting tweet' })
  }
})
app.get('/', (_req, res) => {
  return res.json({ message: 'app is running' })
})

app.listen(5003, () => {
  console.log('server is running on port 5003')
})
