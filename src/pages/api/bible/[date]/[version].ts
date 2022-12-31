import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { supabase } from '~/utils/supabase'
import rateLimit from '~/utils/rate-limit'

// Types
import type { SupabaseBibles, SupabaseGuides } from '~/types/api'

const limiter = rateLimit()

export default async function bibleByDate(
  req: NextApiRequest,
  res: NextApiResponse
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

  const { data, error: guideByDateError } = await supabase
    .from('guides')
    .select()
    .filter('date', 'eq', String(date))
  const guideByDateData = data as SupabaseGuides[]

  if (guideByDateError) {
    return res.status(500).json({ data: null, error: guideByDateError.message })
  }

  if (!guideByDateData || guideByDateData.length === 0) {
    return res
      .status(500)
      .json({ data: null, error: 'Internal server error. (guide not found)' })
  }

  const pl = guideByDateData[0].pl
  const pb = guideByDateData[0].pb
  const inj = guideByDateData[0].in

  const plSpaceSplit = pl.split(' ')
  const pbSpaceSplit = pb.split(' ')
  const injSpaceSplit = inj ? inj.split(' ') : []

  const plArr = []
  const pbArr = []
  const injArr = []

  // Perjanjian Lama (PL)
  const plDashSplit = plSpaceSplit[1].split('-')
  const plColonSplit = plSpaceSplit[1].split(':')
  if (plColonSplit.length > 1) {
    const plColonDashSplit = plColonSplit[1].split('-')

    try {
      const { data, error: plError } = await supabase
        .from('bibles')
        .select()
        .filter('abbr', 'eq', plSpaceSplit[0])
        .filter('chapter', 'eq', String(plColonSplit[0]))
        .filter('version', 'eq', version || 'tb')
      const plData = data as SupabaseBibles[]

      if (plError) {
        return res
          .status(500)
          .json({ data: null, error: `${plError} (pl-colon)` })
      }

      if (plData) {
        plArr.push({
          version: version || 'tb',
          book: plData[0].book,
          chapter: plData[0].chapter,
          passagePlace: `pl-1`,
          data: plData[0].verses.filter(
            (item) =>
              item.verse >= Number(plColonDashSplit[0]) &&
              item.verse <= Number(plColonDashSplit[1])
          ),
        })
      }
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
        const { data, error: plError } = await supabase
          .from('bibles')
          .select()
          .filter('abbr', 'eq', plSpaceSplit[0])
          .filter('chapter', 'eq', i)
          .filter('version', 'eq', version || 'tb')
        const plData = data as SupabaseBibles[]

        if (plError) {
          return res
            .status(500)
            .json({ data: null, error: `${plError} (pl-${place})` })
        }

        if (plData) {
          plArr.push({
            version: version || 'tb',
            book: plData[0].book,
            chapter: i,
            passagePlace: `pl-${place++}`,
            data: plData[0].verses,
          })
        }
      } catch (e) {
        console.error(e)
        return res
          .status(500)
          .json({ data: null, error: `Internal server error. (pl-${place})` })
      }
    }
  } else {
    try {
      const { data, error: plError } = await supabase
        .from('bibles')
        .select()
        .filter('abbr', 'eq', plSpaceSplit[0])
        .filter('chapter', 'eq', plSpaceSplit[1])
        .filter('version', 'eq', version || 'tb')
      const plData = data as SupabaseBibles[]

      if (plError) {
        return res.status(500).json({ data: null, error: `${plError} (pl)` })
      }

      if (plData) {
        plArr.push({
          version: version || 'tb',
          book: plData[0].book,
          chapter: plData[0].chapter,
          passagePlace: `pl-1`,
          data: plData[0].verses,
        })
      }
    } catch (e) {
      console.error(e)
      return res
        .status(500)
        .json({ data: null, error: 'Internal server error. (pl)' })
    }
  }

  // Perjanjian Baru (PB)
  const pbColonSplit = pbSpaceSplit[1].split(':')
  if (pbColonSplit.length > 1) {
    const pbDashSplit = pbColonSplit[1].split('-')

    try {
      const { data, error: pbError } = await supabase
        .from('bibles')
        .select()
        .filter('abbr', 'eq', pbSpaceSplit[0])
        .filter('chapter', 'eq', pbColonSplit[0])
        .filter('version', 'eq', version || 'tb')
      const pbData = data as SupabaseBibles[]

      if (pbError) {
        return res
          .status(500)
          .json({ data: null, error: `${pbError} (pb-colon)` })
      }

      if (pbData) {
        pbArr.push({
          version: version || 'tb',
          book: pbData[0].book,
          chapter: pbData[0].chapter,
          passagePlace: `pb`,
          data: pbData[0].verses.filter(
            (item) =>
              item.verse >= Number(pbDashSplit[0]) &&
              item.verse <= Number(pbDashSplit[1])
          ),
        })
      }
    } catch (e) {
      console.error(e)
      return res
        .status(500)
        .json({ data: null, error: 'Internal server error. (pb-colon)' })
    }
  } else {
    try {
      const { data, error: pbError } = await supabase
        .from('bibles')
        .select()
        .filter('abbr', 'eq', pbSpaceSplit[0])
        .filter('chapter', 'eq', pbSpaceSplit[1])
        .filter('version', 'eq', version || 'tb')
      const pbData = data as SupabaseBibles[]

      if (pbError) {
        return res.status(500).json({ data: null, error: `${pbError} (pb)` })
      }

      if (pbData) {
        pbArr.push({
          version: version || 'tb',
          book: pbData[0].book,
          chapter: pbData[0].chapter,
          passagePlace: `pb`,
          data: pbData[0].verses,
        })
      }
    } catch (e) {
      console.error(e)
      return res
        .status(500)
        .json({ data: null, error: 'Internal server error. (pb)' })
    }
  }

  // Kitab Injil (IN)
  if (injSpaceSplit.length > 1) {
    const injDashSplit = injSpaceSplit[1].split('-')
    const injColonSplit = injSpaceSplit[1].split(':')

    if (injColonSplit.length > 1) {
      const injColonDashSplit = injColonSplit[1].split('-')

      try {
        const { data, error: inError } = await supabase
          .from('bibles')
          .select()
          .filter('abbr', 'eq', injSpaceSplit[0])
          .filter('chapter', 'eq', injColonSplit[0])
          .filter('version', 'eq', version || 'tb')
        const inData = data as SupabaseBibles[]

        if (inError) {
          return res
            .status(500)
            .json({ data: null, error: `${inError} (in-colon)` })
        }

        if (inData) {
          injArr.push({
            version: version || 'tb',
            book: inData[0].book,
            chapter: inData[0].chapter,
            passagePlace: `in`,
            data: inData[0].verses.filter(
              (item) =>
                item.verse >= Number(injColonDashSplit[0]) &&
                item.verse <= Number(injColonDashSplit[1])
            ),
          })
        }
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
          const { data, error: inError } = await supabase
            .from('bibles')
            .select()
            .filter('abbr', 'eq', injSpaceSplit[0])
            .filter('chapter', 'eq', i)
            .filter('version', 'eq', version || 'tb')
          const inData = data as SupabaseBibles[]

          if (inError) {
            return res
              .status(500)
              .json({ data: null, error: `${inError} (in-${place})` })
          }

          if (inData) {
            injArr.push({
              version: version || 'tb',
              book: inData[0].book,
              chapter: i,
              passagePlace: `in-${place++}`,
              data: inData[0].verses,
            })
          }
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
        const { data, error: inError } = await supabase
          .from('bibles')
          .select()
          .filter('abbr', 'eq', injSpaceSplit[0])
          .filter('chapter', 'eq', injSpaceSplit[1])
          .filter('version', 'eq', version || 'tb')
        const inData = data as SupabaseBibles[]

        if (inError) {
          return res.status(500).json({ data: null, error: `${inError} (in})` })
        }

        if (inData) {
          injArr.push({
            version: version || 'tb',
            book: inData[0].book,
            chapter: inData[0].chapter,
            passagePlace: `in`,
            data: inData[0].verses,
          })
        }
      } catch (e) {
        console.error(e)
        return res.status(500).json({
          data: null,
          error: 'Internal server error. (in)',
        })
      }
    }
  }

  const plList = []
  for (let i = 1; i <= plArr.length; i++) {
    plList.push(`pl-${i}`)
  }

  // const injList = []
  // for (let i = 1; i <= injArr.length; i++) {
  //   injList.push(`in-${i}`)
  // }
  const injList = ['in']

  const readyToSendData = {
    passage: [...plList, 'pb', ...injList],
    pl: [...plArr],
    pb: [...pbArr],
    in: [...injArr],
  }

  try {
    await limiter.check(res, 25, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  return res.json({ data: readyToSendData, error: null })
}
