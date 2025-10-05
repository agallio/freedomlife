import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { supabase } from '../../../utils/supabase'
import rateLimit from '../../../utils/rate-limit'
import { apiRateLimit } from '@repo/app/utils/constants'

const limiter = rateLimit()

const availableVersions = [
  'tb',
  'bis',
  'fayh',
  'vmd',
  'msg',
  'nkjv',
  'amp',
  'niv',
]

export default async function getBibleFile(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  res.setHeader('Netlify-Vary', 'query')

  const { version } = req.query

  if (!version) {
    return res.status(400).json({
      data: null,
      error: `Param 'version' is missing.`,
    })
  }

  try {
    await limiter.check(res, apiRateLimit, 'API_RATE_LIMIT')
  } catch {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  if (!availableVersions.includes(version as string)) {
    return res.status(400).json({ data: null, error: 'Version not available.' })
  }

  const filename = `${version}_bible.json`

  const {
    data: { publicUrl },
  } = supabase.storage.from('bibles').getPublicUrl(filename)

  if (!publicUrl) {
    return res.status(404).json({ data: null, error: 'Bible data not found.' })
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.json({ data: publicUrl, error: null })
}
