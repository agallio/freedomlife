import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Utils
import { apiRateLimit, rateLimitFn } from '../../../../utils/rate-limit'

// Types
import type { SupabaseGuides } from '@repo/app/types/api'

const guidesPath = path.join(process.cwd(), 'databases', 'guides.json')
const guidesData: SupabaseGuides[] = JSON.parse(
  fs.readFileSync(guidesPath, 'utf-8'),
)

const limiter = rateLimitFn()

export default async function guideByMonth(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { monthNumber } = req.query

  if (!monthNumber) {
    return res
      .status(400)
      .json({ data: null, error: `Param 'monthNumber' is missing.` })
  }

  if (Number(monthNumber) < 1 || Number(monthNumber) > 12) {
    return res.status(400).json({
      data: null,
      error: `Param 'monthNumber' should be between 1 to 12.`,
    })
  }

  try {
    await limiter.check(res, apiRateLimit, 'API_RATE_LIMIT')
  } catch {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  // Filter guides by month (pad with leading zero for comparison)
  const paddedMonth = String(monthNumber).padStart(2, '0')
  const monthGuides = guidesData.filter((guide) => guide.month === paddedMonth)

  if (monthGuides.length === 0) {
    return res.status(404).json({ data: null, error: 'Guides not found.' })
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  return res.json({ data: monthGuides, error: null })
}
