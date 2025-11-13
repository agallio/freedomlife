import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { supabase } from '../../../../utils/supabase'
import rateLimit from '../../../../utils/rate-limit'
import dayjs from '@repo/app/utils/dayjs'
import { apiRateLimit } from '@repo/app/utils/constants'

const limiter = rateLimit()

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

  // Handle 2023 No Data
  const { data: rawFlagData } = await supabase
    .from('flags')
    .select()
    .filter('name', 'eq', '2023_notice')
  const flagData: boolean =
    Array.isArray(rawFlagData) && rawFlagData.length > 0
      ? rawFlagData[0].context.no_data
      : false
  const formattedYear = flagData ? '2022' : dayjs().format('YYYY')

  const { data, error } = await supabase
    .from('guides')
    .select()
    .filter('month', 'eq', monthNumber)
    .filter('year', 'eq', formattedYear)
    .order('date', { ascending: true })

  if (error) return res.status(500).json({ data: null, error: error.message })

  if (data && data.length > 0) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    const customData = flagData
      ? data.map((i) => ({
          ...i,
          year: dayjs().format('YYYY'),
          date: String(i.date).replace('2022', dayjs().format('YYYY')),
        }))
      : data
    return res.json({ data: customData, error: null })
  } else {
    return res.status(404).json({ data: null, error: 'Guides not found.' })
  }
}
