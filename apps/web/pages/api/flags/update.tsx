import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { supabase } from '../../../utils/supabase'
import rateLimit from '../../../utils/rate-limit'
import { apiRateLimit } from '@repo/app/utils/constants'

const limiter = rateLimit()

export default async function updateFeatureFlag(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { name, enable, context } = req.body
  const { authorization } = req.headers

  if (authorization !== process.env.REVALIDATE_KEY) {
    return res.status(401).json({ data: null, error: 'Unauthorized.' })
  }

  if (!name || typeof enable === 'undefined') {
    return res.status(400).json({
      data: null,
      error: `Data 'name' and/or 'enable' are missing.`,
    })
  }

  const dataToUpdate =
    typeof context !== 'undefined' ? { enable, context } : { enable }

  const { data, error } = await supabase
    .from('flags')
    .update(dataToUpdate)
    .eq('name', name)
    .select()

  try {
    await limiter.check(res, apiRateLimit, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  res.json({ data, error })
}
