import { NextApiRequest, NextApiResponse } from 'next'

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!req.body) {
    return res.status(400).json({ message: 'No body found.' })
  }
  console.log(req.body.key, process.env.REVALIDATE_KEY)
  if (!req.body.key || req.body.key !== process.env.REVALIDATE_KEY) {
    return res.status(400).json({ message: 'Invalid revalidate key.' })
  }

  try {
    await res.unstable_revalidate('/')
    return res.json({
      message: `Successfully revalidated index page.`,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: 'Failed to revalidate index page.',
      error: e,
    })
  }
}
