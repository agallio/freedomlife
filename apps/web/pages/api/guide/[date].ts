import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { supabase } from '../../../utils/supabase'
import rateLimit from '../../../utils/rate-limit'

// Types
import type { GuideDataResponse } from '@repo/app/types'

const limiter = rateLimit()

export default async function guideByDate(
  req: NextApiRequest,
  res: NextApiResponse,
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

  // Handle 2023 No Data
  const { data: rawFlagData } = await supabase
    .from('flags')
    .select()
    .filter('name', 'eq', '2023_notice')
  const flagData: boolean =
    Array.isArray(rawFlagData) && rawFlagData.length > 0
      ? rawFlagData[0].context.no_data
      : false
  const formattedGuideDate = flagData
    ? String(date).replace('2023', '2022')
    : String(date)

  const { data, error } = await supabase
    .from('guides')
    .select()
    .filter('date', 'eq', formattedGuideDate)

  if (error) return res.status(500).json({ data: null, error: error.message })

  try {
    await limiter.check(res, 25, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  if (data && data.length > 0) {
    const extractedData = flagData
      ? { ...data[0], date, year: String(date).split('-')[2] }
      : data[0]
    const plSpaceSplit = extractedData.pl_name.split(' ')
    const inSpaceSplit = extractedData.in_name.split(' ')
    const [plAbbr, plChapter] = extractedData.pl.split(' ')
    const [plChapterSplitted] = plChapter.split('-')
    const [pbAbbr, pbChapter] = extractedData.pb.split(' ')
    const [pbChapterSplitted] = pbChapter.split(':')
    const [inAbbr, inChapter] = extractedData?.in?.split(' ') || []
    const [inChapterSplitted] = inChapter?.split(':') || []

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
      (_, i) => Number(plDashSplit[0]) + i,
    )

    const dashSplitFn = (): string[] => {
      switch (inSpaceSplit.length) {
        case 4:
          return inSpaceSplit[3] !== undefined ? inSpaceSplit[3].split('-') : []
        case 3:
          return inSpaceSplit[2] !== undefined ? inSpaceSplit[2].split('-') : []
        default:
          return inSpaceSplit[1] !== undefined ? inSpaceSplit[1].split('-') : []
      }
    }
    const inDashSplit = dashSplitFn()

    const inList = Array.from(
      {
        length: (Number(inDashSplit[1]) - Number(inDashSplit[0])) / 1 + 1,
      },
      (_, i) => Number(inDashSplit[0]) + i,
    )

    const guideBibleData = () => {
      if (plList.length > 0 && inList.length > 0) {
        const plArray = plList.map((pl, index) => ({
          title:
            plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${pl}`
              : `${plSpaceSplit[0]} ${pl}`,
          subtitle: `Perjanjian Lama ${index + 1}`,
          abbr: `${plAbbr}-${pl}`,
          value: `pl-${index + 1}`,
        }))

        const inArray = inList.map((inItem, index) => {
          const inItemTitle = () => {
            switch (inSpaceSplit.length) {
              case 4:
                return `${inSpaceSplit[0]} ${inSpaceSplit[1]} ${inSpaceSplit[2]} ${inItem}`
              case 3:
                return `${inSpaceSplit[0]} ${inSpaceSplit[1]} ${inItem}`
              default:
                return `${inSpaceSplit[0]} ${inItem}`
            }
          }

          return {
            title: inItemTitle(),
            subtitle: `Kitab Rasuli ${index + 1}`,
            abbr: `${inAbbr}-${inItem}`,
            value: `in-${index + 1}`,
          }
        })

        return [
          ...plArray,
          {
            title: extractedData.pb_name,
            subtitle: 'Perjanjian Baru',
            abbr: `${pbAbbr}-${pbChapterSplitted}`,
            value: 'pb',
          },
          ...inArray,
        ]
      }

      if (plList.length > 0) {
        const plArray = plList.map((pl, index) => ({
          title:
            plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${pl}`
              : `${plSpaceSplit[0]} ${pl}`,
          subtitle: `Perjanjian Lama ${index + 1}`,
          abbr: `${plAbbr}-${pl}`,
          value: `pl-${index + 1}`,
        }))

        return [
          ...plArray,
          {
            title: extractedData.pb_name,
            subtitle: 'Kitab Injil',
            abbr: `${pbAbbr}-${pbChapterSplitted}`,
            value: 'pb',
          },
          extractedData?.in && {
            title: extractedData.in_name,
            subtitle: 'Kitab Rasuli',
            abbr: `${inAbbr}-${inChapterSplitted}`,
            value: 'in-1',
          },
        ]
      }

      return [
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
        extractedData?.in && {
          title: extractedData.in_name,
          subtitle: 'Kitab Injil',
          abbr: `${inAbbr}-${inChapterSplitted}`,
          value: 'in-1',
        },
      ]
    }

    const newData: GuideDataResponse = {
      ...extractedData,
      guide_bible_data: guideBibleData(),
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.json({ data: newData, error: null })
  } else {
    return res.status(404).json({ data: null, error: 'Guide not found.' })
  }
}
