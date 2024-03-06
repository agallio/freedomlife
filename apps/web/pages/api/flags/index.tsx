import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { supabase, type SupabaseFeatureFlag } from '../../../utils/supabase'
import rateLimit from '../../../utils/rate-limit'

const limiter = rateLimit()

export default async function featureFlags(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { flags } = req.query

  if (!flags) {
    return res.status(400).json({
      data: null,
      error: `Param 'flags' is missing.`,
    })
  }

  const { data: rawData, error } = await supabase
    .from('flags')
    .select()
    .filter('name', 'eq', flags)
  const data = rawData as SupabaseFeatureFlag[]

  if (error) return res.status(500).json({ data: null, error: error.message })

  try {
    await limiter.check(res, 25, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  if (Array.isArray(data) && data.length > 0) {
    const extractedData = data[0]
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    res.json({ data: extractedData, error: null })
  } else {
    res.status(404).json({ data: null, error: 'Flags not found.' })
  }
}
