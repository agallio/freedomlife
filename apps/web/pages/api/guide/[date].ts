import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Utils
import { apiRateLimit, rateLimitFn } from '../../../utils/rate-limit'
import { bibleTranslationsFlat, tsiAbbrs } from '@repo/app/utils/constants'

// Types
import type { SupabaseGuides, GuideDataResponse } from '@repo/app/types/api'

const guidesPath = path.join(process.cwd(), 'databases', 'guides_2025.json')
const guidesData: SupabaseGuides[] = JSON.parse(
  fs.readFileSync(guidesPath, 'utf-8'),
)

type GuideBibleDataItem = {
  title: string
  subtitle: string
  abbr: string
  value: string
}

const limiter = rateLimitFn()

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

  try {
    await limiter.check(res, apiRateLimit, 'API_RATE_LIMIT')
  } catch {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  const guideEntry = guidesData.find((guide) => guide.date === String(date))

  if (!guideEntry) {
    return res.status(404).json({ data: null, error: 'Guide not found.' })
  }

  const extractedData = guideEntry
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
  const plLastPart = [...plSpaceSplit].pop()
  if (!plLastPart) {
    return res.status(500).json({
      data: null,
      error: 'Invalid guide data format (PL)',
    })
  }
  const plDashSplit = plLastPart.split('-')
  const plList = Array.from(
    {
      length: (Number(plDashSplit[1]) - Number(plDashSplit[0])) / 1 + 1,
    },
    (_, i) => Number(plDashSplit[0]) + i,
  )

  // Splitter - Perjanjian Baru
  const pbLastPart = [...pbSpaceSplit].pop()
  if (!pbLastPart) {
    return res.status(500).json({
      data: null,
      error: 'Invalid guide data format (PB)',
    })
  }
  const pbDashSplit = pbLastPart.split('-')
  const pbList = Array.from(
    {
      length: (Number(pbDashSplit[1]) - Number(pbDashSplit[0])) / 1 + 1,
    },
    (_, i) => Number(pbDashSplit[0]) + i,
  )

  // Splitter - Kitab Injil
  const inLastPart = [...inSpaceSplit].pop()
  if (!inLastPart) {
    return res.status(500).json({
      data: null,
      error: 'Invalid guide data format (IN)',
    })
  }
  const inDashSplit = inLastPart.split('-')
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
  const currentBibleTranslations = bibleTranslationsFlat.map(
    (version) => version.key,
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
}
