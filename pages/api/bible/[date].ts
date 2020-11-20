import { Model, Document } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import { getDatabase, GuideInterface, BibleInterface } from '../../../src/db'

const getGuideByDate = async (
  date: string,
  GuideModel: Model<Document, unknown>
): Promise<GuideInterface | boolean> => {
  try {
    const guide = (await GuideModel.findOne({
      date,
    })) as GuideInterface

    if (guide) {
      return guide
    } else {
      return false
    }
  } catch (e) {
    console.error(e)
    return false
  }
}

const bibleToday = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const database = await getDatabase()
  const {
    GuideModel,
    TBBibleModel,
    BISBibleModel,
    FAYHBibleModel,
    MSGBibleModel,
    NKJVBibleModel,
  } = database

  const { date, version } = req.query

  const guideByDate = (await getGuideByDate(
    date as string,
    GuideModel
  )) as GuideInterface

  if (!guideByDate) {
    res.status(404).json({
      status: 404,
      ok: false,
      data: null,
      error: { message: "Unable to find today's guide. (bible/today)" },
    })
    return
  }

  const pl = guideByDate.pl
  const pb = guideByDate.pb
  const alt = guideByDate.alt

  const plSpaceSplit = pl.split(' ')
  const pbSpaceSplit = pb.split(' ')
  const altSpaceSplit = alt ? alt.split(' ') : []

  const plArr = []
  const pbArr = []
  const altArr = []

  const bibleVersion = (abbr: string, chapter: string | number) => {
    switch (version) {
      case 'tb':
        return TBBibleModel.findOne({
          $and: [{ abbr }, { chapter }],
        })
      case 'bis':
        return BISBibleModel.findOne({
          $and: [{ abbr }, { chapter }],
        })
      case 'fayh':
        return FAYHBibleModel.findOne({
          $and: [{ abbr }, { chapter }],
        })
      case 'msg':
        return MSGBibleModel.findOne({
          $and: [{ abbr }, { chapter }],
        })
      case 'nkjv':
        return NKJVBibleModel.findOne({
          $and: [{ abbr }, { chapter }],
        })

      default:
        return TBBibleModel.findOne({
          $and: [{ abbr }, { chapter }],
        })
    }
  }

  const plDashSplit = plSpaceSplit[1].split('-')
  const plColonSplit = plSpaceSplit[1].split(':')
  if (plColonSplit.length > 1) {
    const plColonDashSplit = plColonSplit[1].split('-')

    try {
      const passage = (await bibleVersion(
        plSpaceSplit[0],
        plColonDashSplit[0]
      )) as BibleInterface

      plArr.push({
        version: version || 'tb',
        book: passage.book,
        chapter: passage.chapter,
        passagePlace: `pl-1`,
        data: passage.verses.filter(
          (item) =>
            item.verse >= Number(plColonDashSplit[0]) &&
            item.verse <= Number(plColonDashSplit[1])
        ),
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({
        status: 500,
        ok: false,
        data: null,
        error: { message: 'Internal Server Error. (bible/today/pl-colon)' },
      })
    }
  } else if (plDashSplit.length > 1) {
    let place = 1
    for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
      try {
        const passage = (await bibleVersion(
          plSpaceSplit[0],
          i
        )) as BibleInterface

        plArr.push({
          version: version || 'tb',
          book: passage.book,
          chapter: i,
          passagePlace: `pl-${place++}`,
          data: passage.verses,
        })
      } catch (e) {
        console.error(e)
        res.status(500).json({
          status: 500,
          ok: false,
          data: null,
          error: {
            message: `Internal Server Error. (bible/today/pl-${place})`,
          },
        })
      }
    }
  } else {
    try {
      const passage = (await bibleVersion(
        plSpaceSplit[0],
        plSpaceSplit[1]
      )) as BibleInterface

      plArr.push({
        version: version || 'tb',
        book: passage.book,
        chapter: passage.chapter,
        passagePlace: `pl-1`,
        data: passage.verses,
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({
        status: 500,
        ok: false,
        data: null,
        error: { message: 'Internal Server Error. (bible/today/pl)' },
      })
    }
  }

  const pbColonSplit = pbSpaceSplit[1].split(':')
  if (pbColonSplit.length > 1) {
    const pbDashSplit = pbColonSplit[1].split('-')

    try {
      const passage = (await bibleVersion(
        pbSpaceSplit[0],
        pbColonSplit[0]
      )) as BibleInterface

      pbArr.push({
        version: version || 'tb',
        book: passage.book,
        chapter: passage.chapter,
        passagePlace: `pb`,
        data: passage.verses.filter(
          (item) =>
            item.verse >= Number(pbDashSplit[0]) &&
            item.verse <= Number(pbDashSplit[1])
        ),
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({
        status: 500,
        ok: false,
        data: null,
        error: { message: 'Internal Server Error. (bible/today/pb-colon)' },
      })
    }
  } else {
    try {
      const passage = (await bibleVersion(
        pbSpaceSplit[0],
        pbSpaceSplit[1]
      )) as BibleInterface

      pbArr.push({
        version: version || 'tb',
        book: passage.book,
        chapter: passage.chapter,
        passagePlace: `pb`,
        data: passage.verses,
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({
        status: 500,
        ok: false,
        data: null,
        error: { message: 'Internal Server Error. (bible/today/pb)' },
      })
    }
  }

  if (alt && altSpaceSplit.length > 1) {
    const altDashSplit = altSpaceSplit[1].split('-')
    const altColonSplit = altSpaceSplit[1].split(':')

    if (altColonSplit.length > 1) {
      const altColonDashSplit = altColonSplit[1].split('-')

      try {
        const passage = (await bibleVersion(
          altSpaceSplit[0],
          altColonSplit[0]
        )) as BibleInterface

        altArr.push({
          version: version || 'tb',
          book: passage.book,
          chapter: passage.chapter,
          passagePlace: `alt-1`,
          data: passage.verses.filter(
            (item) =>
              item.verse >= Number(altColonDashSplit[0]) &&
              item.verse <= Number(altColonDashSplit[1])
          ),
        })
      } catch (e) {
        console.error(e)
        res.status(500).json({
          status: 500,
          ok: false,
          data: null,
          error: { message: 'Internal Server Error. (bible/today/alt-colon)' },
        })
      }
    } else if (altDashSplit.length > 1) {
      let place = 1
      for (let i = Number(altDashSplit[0]); i <= Number(altDashSplit[1]); i++) {
        try {
          const passage = (await bibleVersion(
            altSpaceSplit[0],
            i
          )) as BibleInterface

          altArr.push({
            version: version || 'tb',
            book: passage.book,
            chapter: i,
            passagePlace: `alt-${place++}`,
            data: passage.verses,
          })
        } catch (e) {
          console.error(e)
          res.status(500).json({
            status: 500,
            ok: false,
            data: null,
            error: {
              message: `Internal Server Error. (bible/today/alt-${place})`,
            },
          })
        }
      }
    } else {
      try {
        const passage = (await bibleVersion(
          altSpaceSplit[0],
          altSpaceSplit[1]
        )) as BibleInterface

        altArr.push({
          version: version || 'tb',
          book: passage.book,
          chapter: passage.chapter,
          passagePlace: `alt-1`,
          data: passage.verses,
        })
      } catch (e) {
        console.error(e)
        res.status(500).json({
          status: 500,
          ok: false,
          data: null,
          error: { message: 'Internal Server Error. (bible/today/alt)' },
        })
      }
    }
  }

  const plList = []
  for (let i = 1; i <= plArr.length; i++) {
    plList.push(`pl-${i}`)
  }

  const altList = []
  if (alt) {
    for (let i = 1; i <= altArr.length; i++) {
      altList.push(`alt-${i}`)
    }
  }

  let data
  if (alt) {
    data = {
      passage: [...plList, 'pb', ...altList],
      pl: [...plArr],
      pb: [...pbArr],
      alt: [...altArr],
    }
  } else {
    data = {
      passage: [...plList, 'pb'],
      pl: [...plArr],
      pb: [...pbArr],
    }
  }

  await res.json({
    status: 200,
    ok: true,
    data,
    error: null,
  })
}

export default bibleToday
