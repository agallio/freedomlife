import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

// Utils
import rateLimit from '~/utils/rate-limit'

const limiter = rateLimit()

export default async function umamiSend(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  if (!req.body) {
    return res.status(400).json({ data: null, error: 'Bad request.' })
  }

  if (!req.headers['user-agent']) {
    return res
      .status(400)
      .json({ data: null, error: 'Bad request. (error: 2)' })
  }

  const keys = ['hostname', 'referrer', 'screen', 'url']
  const requestKeys = Object.keys(req.body).sort()
  const isKeyEqual = JSON.stringify(keys) === JSON.stringify(requestKeys)

  if (!isKeyEqual) {
    return res.status(400).json({ data: null, error: 'Bad request.' })
  }

  const { hostname, referrer, screen, url } = req.body

  const data = {
    type: 'event',
    payload: {
      website: process.env.UMAMI_WEBSITE_ID,
      title: 'freedomlife app',
      language: 'id-ID',
      hostname,
      referrer,
      screen,
      url,
    },
  }

  try {
    await limiter.check(res, 25, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  try {
    const response = await axios.post(process.env.UMAMI_URL!, data, {
      headers: { 'user-agent': req.headers['user-agent'] },
    })

    res.json({ data: response.data })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ data: null, error: e })
  }
}
