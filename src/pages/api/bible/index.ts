import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@/utils/supabase'
import rateLimit from '@/utils/rate-limit'

import type { SupabaseBibles } from '@/types/api'

const limiter = rateLimit()

const biblePassage = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { passage, version } = req.query

  if (!passage || !version) {
    return res.status(400).json({
      data: null,
      error: `Param 'passage' and/or 'version' is missing.`,
    })
  }

  const passageSplit = (passage as string).split('-')

  const { data, error } = await supabase
    .from<SupabaseBibles>('bibles')
    .select()
    .filter('version', 'eq', version || 'tb')
    .filter('abbr', 'eq', passageSplit[0])
    .filter('chapter', 'eq', passageSplit[1])

  if (error) return res.status(500).json({ data: null, error: error.message })

  try {
    await limiter.check(res, 25, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  if (data) {
    try {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
      return res.json({
        data: {
          version: version || 'tb',
          book: data[0].book,
          chapter: data[0].chapter,
          data: data[0].verses,
        },
        error: null,
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({ data: null, error: 'Internal server error.' })
    }
  } else {
    return res.status(404).json({ data: null, error: 'Chapter not found.' })
  }
}

export default biblePassage
