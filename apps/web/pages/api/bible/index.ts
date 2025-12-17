import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Utils
import { apiRateLimit, rateLimitFn } from '../../../utils/rate-limit'
import { getBibleData } from '../../../utils/hono-api'
import { isSunsetActive } from '@repo/app/utils/constants'

// Types
import type { SupabaseBibles } from '@repo/app/types/api'

const tbBiblePath = path.join(process.cwd(), 'databases', 'tb_bible.json')
const tbBibleData: SupabaseBibles[] = JSON.parse(
  fs.readFileSync(tbBiblePath, 'utf-8'),
)

const limiter = rateLimitFn()

export default async function biblePassage(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { passage, version } = req.query

  if (!passage || !version) {
    return res.status(400).json({
      data: null,
      error: `Param 'passage' and/or 'version' are missing.`,
    })
  }

  if (isSunsetActive() && version !== 'tb') {
    return res.status(404).json({
      data: null,
      error: 'Bible version not found.',
    })
  }

  try {
    await limiter.check(res, apiRateLimit, 'API_RATE_LIMIT')
  } catch {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  const passageSplit = (passage as string).split('-')
  const abbr = passageSplit[0]
  const chapter = passageSplit[1]

  if (!abbr || !chapter) {
    return res.status(400).json({
      data: null,
      error:
        'Invalid passage format. Expected format: abbr-chapter (e.g., kej-1)',
    })
  }

  if (version === 'tb') {
    const chapterData = tbBibleData.find(
      (item) =>
        item.abbr === abbr && item.chapter === chapter && item.version === 'tb',
    )

    if (!chapterData) {
      return res.status(404).json({ data: null, error: 'Chapter not found.' })
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.json({
      data: {
        version: 'tb',
        book: chapterData.book,
        chapter: chapterData.chapter,
        data: chapterData.verses,
      },
      error: null,
    })
  }

  try {
    const honoResponse = await getBibleData(version as string, abbr, chapter)

    if (honoResponse.error || !honoResponse.data) {
      return res.status(500).json({
        data: null,
        error: honoResponse.error || 'Failed to fetch Bible data',
      })
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.json({
      data: honoResponse.data,
      error: null,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ data: null, error: 'Internal server error.' })
  }
}
