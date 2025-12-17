import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { getBibleFile as getBibleFileFromApi } from '../../../utils/hono-api'
import { apiRateLimit, rateLimitFn } from '../../../utils/rate-limit'
import { SUNSET_DATE } from '@repo/app/utils/constants'

const limiter = rateLimitFn()
const TB_BIBLE_GITHUB_URL =
  'https://raw.githubusercontent.com/agallio/freedomlife/refs/heads/main/apps/web/databases/tb_bible.json'

const availableVersionsBefore2026 = [
  'tb',
  'bis',
  'fayh',
  'vmd',
  'msg',
  'nkjv',
  'amp',
  'niv',
]

const availableVersionsAfter2026 = ['tb']

export default async function getBibleFile(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

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

  const now = new Date()
  const is2026OrLater = now >= SUNSET_DATE

  const availableVersions = is2026OrLater
    ? availableVersionsAfter2026
    : availableVersionsBefore2026

  if (!availableVersions.includes(version as string)) {
    return res.status(400).json({
      data: null,
      error: is2026OrLater
        ? `Only TB version is available for download. Other translations were sunset on ${SUNSET_DATE.toISOString().split('T')[0]}.`
        : 'Version not available.',
    })
  }

  if (is2026OrLater) {
    if (version === 'tb') {
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
      return res.json({ data: TB_BIBLE_GITHUB_URL, error: null })
    }
    // This shouldn't be reached due to availableVersions check above, but just in case
    return res.status(400).json({
      data: null,
      error: `Only TB version is available.`,
    })
  }

  const apiResponse = await getBibleFileFromApi(version as string)

  if (apiResponse.error || !apiResponse.data) {
    return res.status(404).json({
      data: null,
      error: apiResponse.error || 'Bible file not found.',
    })
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.json({ data: apiResponse.data, error: null })
}
