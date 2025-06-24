import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { supabase } from '../../../utils/supabase'
import rateLimit from '../../../utils/rate-limit'
import {
  apiRateLimit,
  bibleTranslations,
  tsiAbbrs,
} from '@repo/app/utils/constants'

// Types
import type { GuideDataResponse } from '@repo/app/types'

type GuideBibleDataItem = {
  title: string
  subtitle: string
  abbr: string
  value: string
}

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
    await limiter.check(res, apiRateLimit, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  if (data && data.length > 0) {
    const extractedData = flagData
      ? { ...data[0], date, year: String(date).split('-')[2] }
      : data[0]
    const plSpaceSplit = extractedData.pl_name.split(' ')
    const pbSpaceSplit = extractedData.pb_name.split(' ')
    const inSpaceSplit = extractedData.in_name.split(' ')
    const [plAbbr, plChapter] = extractedData.pl.split(' ')
    const [plChapterSplitted] = plChapter.split('-')
    const [pbAbbr, pbChapter] = extractedData.pb.split(' ')
    const [pbChapterSplitted] = pbChapter.split(':')
    const [inAbbr, inChapter] = extractedData?.in?.split(' ') || []
    const [inChapterSplitted] = inChapter?.split(':') || []

    // Splitter - Perjanjian Lama
    const plDashSplit = [...plSpaceSplit].pop().split('-')
    const plList = Array.from(
      {
        length: (Number(plDashSplit[1]) - Number(plDashSplit[0])) / 1 + 1,
      },
      (_, i) => Number(plDashSplit[0]) + i,
    )

    // Splitter - Perjanjian Baru
    const pbDashSplit = [...pbSpaceSplit].pop().split('-')
    const pbList = Array.from(
      {
        length: (Number(pbDashSplit[1]) - Number(pbDashSplit[0])) / 1 + 1,
      },
      (_, i) => Number(pbDashSplit[0]) + i,
    )

    // Splitter - Kitab Injil
    const inDashSplit = [...inSpaceSplit].pop().split('-')
    const inList = Array.from(
      {
        length: (Number(inDashSplit[1]) - Number(inDashSplit[0])) / 1 + 1,
      },
      (_, i) => Number(inDashSplit[0]) + i,
    )

    const guideBibleData = () => {
      let plArray: GuideBibleDataItem[] = []
      let pbArray: GuideBibleDataItem[] = []
      let inArray: GuideBibleDataItem[] = []

      // Perjanjian Lama
      if (plList.length > 0) {
        plArray = plList.map((pl, index) => {
          const titleWithoutChapter = [...plSpaceSplit].slice(0, -1).join(' ')

          return {
            title: `${titleWithoutChapter} ${pl}`,
            subtitle: `Perjanjian Lama ${index + 1}`,
            abbr: `${plAbbr}-${pl}`,
            value: `pl-${index + 1}`,
          }
        })
      } else if (plList.length === 0) {
        plArray = [
          {
            title: extractedData.pl_name,
            subtitle: 'Perjanjian Lama 1',
            abbr: `${plAbbr}-${plChapterSplitted}`,
            value: 'pl-1',
          },
        ]
      }

      // Perjanjian Baru
      if (pbList.length > 0) {
        pbArray = pbList.map((pb, index) => {
          const titleWithoutChapter = [...pbSpaceSplit].slice(0, -1).join(' ')

          return {
            title: `${titleWithoutChapter} ${pb}`,
            subtitle: `Perjanjian Baru ${index + 1}`,
            abbr: `${pbAbbr}-${pbChapterSplitted}`,
            value: `pb-${index + 1}`,
          }
        })
      } else if (pbList.length === 0) {
        pbArray = [
          {
            title: extractedData.pb_name,
            subtitle: 'Perjanjian Baru 1',
            abbr: `${pbAbbr}-${pbChapterSplitted}`,
            value: 'pb-1',
          },
        ]
      }

      // Kitab Rasuli
      if (inList.length > 0) {
        inArray = inList.map((inItem, index) => {
          const titleWithoutChapter = [...inSpaceSplit].slice(0, -1).join(' ')

          return {
            title: `${titleWithoutChapter} ${inItem}`,
            subtitle: `Kitab Rasuli ${index + 1}`,
            abbr: `${inAbbr}-${inChapterSplitted}`,
            value: `in-${index + 1}`,
          }
        })
      } else if (inList.length === 0) {
        inArray = [
          {
            title: extractedData.in_name,
            subtitle: 'Kitab Rasuli 1',
            abbr: `${inAbbr}-${inChapterSplitted}`,
            value: 'in-1',
          },
        ]
      }

      return [...plArray, ...pbArray, ...inArray]
    }

    // Check for available bible translations.
    // Because 'TSI' version is not available in all abbr.
    const currentBibleTranslations = bibleTranslations.flatMap((root) =>
      root.versions.flatMap((version) => version.key),
    )
    const isTSIAvailable =
      tsiAbbrs.includes(plAbbr) &&
      tsiAbbrs.includes(pbAbbr) &&
      tsiAbbrs.includes(inAbbr)
    const availableBibleTranslations = isTSIAvailable
      ? currentBibleTranslations
      : currentBibleTranslations.filter((translation) => translation !== 'tsi')

    const newData: GuideDataResponse = {
      ...extractedData,
      guide_bible_data: guideBibleData(),
      available_bible_translations: availableBibleTranslations,
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.json({ data: newData, error: null })
  } else {
    return res.status(404).json({ data: null, error: 'Guide not found.' })
  }
}
