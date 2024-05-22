import { TwitterApi } from 'twitter-api-v2'
import axios from 'axios'
import 'dotenv/config'

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }

  try {
    const { data } = await axios.get(process.env.FACTS_API_URL, {
      headers: {
        'X-Api-Key': process.env.FACTS_API_KEY,
      },
    })
    await client.v2.tweet(data[0].fact)
    res.status(200).send('Tweet was posted')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}