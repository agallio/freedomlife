import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { supabase } from '~/utils/supabase'
import rateLimit from '~/utils/rate-limit'

// Types
import type { GuideDataResponse } from '~/types/api'

const limiter = rateLimit()

export default async function guideByDate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { date } = req.query

  if (!date) {
    return res
      .status(400)
      .json({ data: null, error: `Param 'date' is missing.` })
  }

  const { data, error } = await supabase
    .from('guides')
    .select()
    .filter('date', 'eq', String(date))

  if (error) return res.status(500).json({ data: null, error: error.message })

  try {
    await limiter.check(res, 25, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  if (data && data.length > 0) {
    const extractedData = data[0]
    const plSpaceSplit = extractedData.pl_name.split(' ')
    const [plAbbr, plChapter] = extractedData.pl.split(' ')
    const [plChapterSplitted] = plChapter.split('-')
    const [pbAbbr, pbChapter] = extractedData.pb.split(' ')
    const [pbChapterSplitted] = pbChapter.split(':')

    const plDashSplit =
      plSpaceSplit.length === 3
        ? plSpaceSplit[2] !== undefined
          ? plSpaceSplit[2].split('-')
          : []
        : plSpaceSplit[1] !== undefined
        ? plSpaceSplit[1].split('-')
        : []

    const plList = Array.from(
      {
        length: (Number(plDashSplit[1]) - Number(plDashSplit[0])) / 1 + 1,
      },
      (_, i) => Number(plDashSplit[0]) + i
    )

    const guideBibleData =
      plList.length > 0
        ? [
            ...plList.map((pl, index) => ({
              title: `${plSpaceSplit[0]} ${pl}`,
              subtitle: `Perjanjian Lama ${index + 1}`,
              abbr: `${plAbbr}-${pl}`,
              value: `pl-${index + 1}`,
            })),
            {
              title: extractedData.pb_name,
              subtitle: 'Perjanjian Baru',
              abbr: `${pbAbbr}-${pbChapterSplitted}`,
              value: 'pb',
            },
          ]
        : [
            {
              title: extractedData.pl_name,
              subtitle: 'Perjanjian Lama 1',
              abbr: `${plAbbr}-${plChapterSplitted}`,
              value: 'pl-1',
            },
            {
              title: extractedData.pb_name,
              subtitle: 'Perjanjian Baru',
              abbr: `${pbAbbr}-${pbChapterSplitted}`,
              value: 'pb',
            },
          ]

    const newData: GuideDataResponse = {
      ...extractedData,
      guide_bible_data: guideBibleData,
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.json({ data: newData, error: null })
  } else {
    return res.status(404).json({ data: null, error: 'Guide not found.' })
  }
}
