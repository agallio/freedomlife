import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Utils
import { apiRateLimit, rateLimitFn } from '../../../../utils/rate-limit'
import { getBibleData } from '../../../../utils/hono-api'

// Constants
import { tsiAbbrs, isSunsetActive } from '@repo/app/utils/constants'

// Types
import type {
  ChaptersData,
  VerseData,
  SupabaseBibles,
  SupabaseGuides,
} from '@repo/app/types/api'

const guidesPath = path.join(process.cwd(), 'databases', 'guides.json')
const guidesData: SupabaseGuides[] = JSON.parse(
  fs.readFileSync(guidesPath, 'utf-8'),
)

const tbBiblePath = path.join(process.cwd(), 'databases', 'tb_bible.json')
const tbBibleData: SupabaseBibles[] = JSON.parse(
  fs.readFileSync(tbBiblePath, 'utf-8'),
)

const limiter = rateLimitFn()

async function fetchBibleChapter(
  abbr: string,
  chapter: string,
  version: string,
): Promise<{
  abbr: string
  book: string
  chapter: string
  version: string
  verses: VerseData[]
} | null> {
  if (version === 'tb') {
    const chapterData = tbBibleData.find(
      (item) =>
        item.abbr === abbr && item.chapter === chapter && item.version === 'tb',
    )
    return chapterData || null
  }

  const apiResponse = await getBibleData(version, abbr, chapter)

  if (apiResponse.error || !apiResponse.data) {
    return null
  }

  return {
    abbr,
    book: apiResponse.data.book,
    chapter: apiResponse.data.chapter.toString(),
    version: apiResponse.data.version,
    verses: apiResponse.data.data,
  }
}

export default async function bibleByDate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { date, version } = req.query

  if (!date) {
    return res
      .status(404)
      .json({ data: null, error: "Param 'date' is missing" })
  }

  if (isSunsetActive() && version !== 'tb') {
    return res.status(404).json({
      data: null,
      error: 'Bible version not found.',
    })
  }

  const guideEntry = guidesData.find((guide) => guide.date === String(date))

  if (!guideEntry) {
    return res.status(404).json({ data: null, error: 'Guide not found' })
  }

  const guideByDateData = [guideEntry]

  try {
    await limiter.check(res, apiRateLimit, 'API_RATE_LIMIT')
  } catch {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  const pl = guideByDateData[0]!.pl
  const pb = guideByDateData[0]!.pb
  const inj = guideByDateData[0]!.in

  const plSpaceSplit = pl.split(' ')
  const pbSpaceSplit = pb.split(' ')
  const injSpaceSplit = inj ? inj.split(' ') : []

  const isTSIAvailable =
    tsiAbbrs.includes(plSpaceSplit[0]) &&
    tsiAbbrs.includes(pbSpaceSplit[0]) &&
    tsiAbbrs.includes(injSpaceSplit[0])

  if (version === 'tsi' && !isTSIAvailable) {
    return res.status(400).json({
      data: null,
      error: `Bible with param version: ${version} is not available.`,
    })
  }

  const plArr: ChaptersData[] = []
  const pbArr: ChaptersData[] = []
  const injArr: ChaptersData[] = []

  // Perjanjian Lama (PL)
  const plDashSplit = plSpaceSplit[1]!.split('-')
  const plColonSplit = plSpaceSplit[1]!.split(':')
  if (plColonSplit.length > 1) {
    const plColonDashSplit = plColonSplit[1]!.split('-')

    try {
      const plData = await fetchBibleChapter(
        plSpaceSplit[0],
        String(plColonSplit[0]),
        (version as string) || 'tb',
      )

      if (!plData) {
        return res
          .status(500)
          .json({ data: null, error: 'Bible data not found (pl-colon)' })
      }

      plArr.push({
        version: (version as string) || 'tb',
        book: plData.book,
        chapter: plData.chapter,
        passagePlace: `pl-1`,
        data: plData.verses.filter(
          (item) =>
            item.verse >= Number(plColonDashSplit[0]) &&
            item.verse <= Number(plColonDashSplit[1]),
        ),
      })
    } catch (e) {
      console.error(e)
      return res
        .status(500)
        .json({ data: null, error: 'Internal server error. (pl-colon)' })
    }
  } else if (plDashSplit.length > 1) {
    let place = 1

    for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
      try {
        const plData = await fetchBibleChapter(
          plSpaceSplit[0],
          String(i),
          (version as string) || 'tb',
        )

        if (!plData) {
          return res
            .status(500)
            .json({ data: null, error: `Bible data not found (pl-${place})` })
        }

        plArr.push({
          version: (version as string) || 'tb',
          book: plData.book,
          chapter: String(i),
          passagePlace: `pl-${place++}`,
          data: plData.verses,
        })
      } catch (e) {
        console.error(e)
        return res
          .status(500)
          .json({ data: null, error: `Internal server error. (pl-${place})` })
      }
    }
  } else {
    try {
      const plData = await fetchBibleChapter(
        plSpaceSplit[0],
        String(plSpaceSplit[1]),
        (version as string) || 'tb',
      )

      if (!plData) {
        return res
          .status(500)
          .json({ data: null, error: 'Bible data not found (pl)' })
      }

      plArr.push({
        version: (version as string) || 'tb',
        book: plData.book,
        chapter: plData.chapter,
        passagePlace: `pl-1`,
        data: plData.verses,
      })
    } catch (e) {
      console.error(e)
      return res
        .status(500)
        .json({ data: null, error: 'Internal server error. (pl)' })
    }
  }

  // Perjanjian Baru (PB)
  const pbDashSplit = pbSpaceSplit[1]!.split('-')
  const pbColonSplit = pbSpaceSplit[1]!.split(':')
  if (pbColonSplit.length > 1) {
    const pbDashColonSplit = pbColonSplit[1]!.split('-')

    try {
      const pbData = await fetchBibleChapter(
        pbSpaceSplit[0],
        String(pbColonSplit[0]),
        (version as string) || 'tb',
      )

      if (!pbData) {
        return res
          .status(500)
          .json({ data: null, error: 'Bible data not found (pb-colon)' })
      }

      pbArr.push({
        version: (version as string) || 'tb',
        book: pbData.book,
        chapter: pbData.chapter,
        passagePlace: `pb-1`,
        data: pbData.verses.filter(
          (item) =>
            item.verse >= Number(pbDashColonSplit[0]) &&
            item.verse <= Number(pbDashColonSplit[1]),
        ),
      })
    } catch (e) {
      console.error(e)
      return res
        .status(500)
        .json({ data: null, error: 'Internal server error. (pb-colon)' })
    }
  } else if (pbDashSplit.length > 1) {
    let place = 1

    for (let i = Number(pbDashSplit[0]); i <= Number(pbDashSplit[1]); i++) {
      try {
        const pbData = await fetchBibleChapter(
          pbSpaceSplit[0],
          String(i),
          (version as string) || 'tb',
        )

        if (!pbData) {
          return res
            .status(500)
            .json({ data: null, error: `Bible data not found (pb-${place})` })
        }

        pbArr.push({
          version: (version as string) || 'tb',
          book: pbData.book,
          chapter: String(i),
          passagePlace: `pb-${place++}`,
          data: pbData.verses,
        })
      } catch (e) {
        console.error(e)
        return res.status(500).json({
          data: null,
          error: `Internal server error. (pb-${place})`,
        })
      }
    }
  } else {
    try {
      const pbData = await fetchBibleChapter(
        pbSpaceSplit[0],
        String(pbSpaceSplit[1]),
        (version as string) || 'tb',
      )

      if (!pbData) {
        return res
          .status(500)
          .json({ data: null, error: 'Bible data not found (pb)' })
      }

      pbArr.push({
        version: (version as string) || 'tb',
        book: pbData.book,
        chapter: pbData.chapter,
        passagePlace: `pb-1`,
        data: pbData.verses,
      })
    } catch (e) {
      console.error(e)
      return res
        .status(500)
        .json({ data: null, error: 'Internal server error. (pb)' })
    }
  }

  // Kitab Injil (IN)
  if (injSpaceSplit.length > 1) {
    const injDashSplit = injSpaceSplit[1]!.split('-')
    const injColonSplit = injSpaceSplit[1]!.split(':')

    if (injColonSplit.length > 1) {
      const injColonDashSplit = injColonSplit[1]!.split('-')

      try {
        const inData = await fetchBibleChapter(
          injSpaceSplit[0],
          String(injColonSplit[0]),
          (version as string) || 'tb',
        )

        if (!inData) {
          return res
            .status(500)
            .json({ data: null, error: 'Bible data not found (in-colon)' })
        }

        injArr.push({
          version: (version as string) || 'tb',
          book: inData.book,
          chapter: inData.chapter,
          passagePlace: `in-1`,
          data: inData.verses.filter(
            (item) =>
              item.verse >= Number(injColonDashSplit[0]) &&
              item.verse <= Number(injColonDashSplit[1]),
          ),
        })
      } catch (e) {
        console.error(e)
        return res
          .status(500)
          .json({ data: null, error: 'Internal server error. (in-colon)' })
      }
    } else if (injDashSplit.length > 1) {
      let place = 1

      for (let i = Number(injDashSplit[0]); i <= Number(injDashSplit[1]); i++) {
        try {
          const inData = await fetchBibleChapter(
            injSpaceSplit[0],
            String(i),
            (version as string) || 'tb',
          )

          if (!inData) {
            return res
              .status(500)
              .json({ data: null, error: `Bible data not found (in-${place})` })
          }

          injArr.push({
            version: (version as string) || 'tb',
            book: inData.book,
            chapter: String(i),
            passagePlace: `in-${place++}`,
            data: inData.verses,
          })
        } catch (e) {
          console.error(e)
          return res.status(500).json({
            data: null,
            error: `Internal server error. (in-${place})`,
          })
        }
      }
    } else {
      try {
        const inData = await fetchBibleChapter(
          injSpaceSplit[0],
          String(injSpaceSplit[1]),
          (version as string) || 'tb',
        )

        if (!inData) {
          return res
            .status(500)
            .json({ data: null, error: 'Bible data not found (in)' })
        }

        injArr.push({
          version: (version as string) || 'tb',
          book: inData.book,
          chapter: inData.chapter,
          passagePlace: `in-1`,
          data: inData.verses,
        })
      } catch (e) {
        console.error(e)
        return res.status(500).json({
          data: null,
          error: 'Internal server error. (in)',
        })
      }
    }
  }

  const plList: string[] = []
  for (let i = 1; i <= plArr.length; i++) {
    plList.push(`pl-${i}`)
  }

  const pbList: string[] = []
  for (let i = 1; i <= pbArr.length; i++) {
    pbList.push(`pb-${i}`)
  }

  const injList: string[] = []
  for (let i = 1; i <= injArr.length; i++) {
    injList.push(`in-${i}`)
  }

  const readyToSendData = {
    passage: [...plList, ...pbList, ...injList],
    pl: [...plArr],
    pb: [...pbArr],
    in: [...injArr],
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  return res.json({ data: readyToSendData, error: null })
}
