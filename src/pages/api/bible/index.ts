import { NextApiRequest, NextApiResponse } from 'next'

import { BibleInterface, getDatabase } from '@/db/index'

const biblePassage = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    TBBibleModel,
    BISBibleModel,
    FAYHBibleModel,
    MSGBibleModel,
    NKJVBibleModel,
  } = await getDatabase()

  const { passage, version } = req.query

  const passageSplit = (passage as string).split('-')

  const bibleVersion = (abbr: string, chapter: string | number) => {
    switch (version) {
      case 'tb':
        return TBBibleModel.findOne({
          $and: [{ abbr }, { chapter: String(chapter) }],
        })
      case 'bis':
        return BISBibleModel.findOne({
          $and: [{ abbr }, { chapter: String(chapter) }],
        })
      case 'fayh':
        return FAYHBibleModel.findOne({
          $and: [{ abbr }, { chapter: String(chapter) }],
        })
      case 'msg':
        return MSGBibleModel.findOne({
          $and: [{ abbr }, { chapter: String(chapter) }],
        })
      case 'nkjv':
        return NKJVBibleModel.findOne({
          $and: [{ abbr }, { chapter: String(chapter) }],
        })

      default:
        return TBBibleModel.findOne({
          $and: [{ abbr }, { chapter: String(chapter) }],
        })
    }
  }

  try {
    const passage = (await bibleVersion(
      passageSplit[0],
      passageSplit[1]
    )) as BibleInterface

    if (passage) {
      res.json({
        status: 200,
        ok: true,
        data: {
          version: version || 'tb',
          book: passage.book,
          chapter: passage.chapter,
          data: passage.verses,
        },
        error: null,
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      ok: false,
      data: null,
      error: { message: 'Internal Server Error. (bible/passage)' },
    })
  }
}

export default biblePassage
