import { TwitterApi } from 'twitter-api-v2'
import axios from 'axios'
import 'dotenv/config'

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const postTweet = async () => {
  try {
    const { data } = await axios.get(process.env.FACTS_API_URl, {
      headers: {
        'X-Api-Key': process.env.FACTS_API_KEY,
      },
    })
    await client.v2.tweet(data[0].fact)
    console.log('tweet was posted')
  } catch (error) {
    console.log(error)
  }
}
postTweet()
