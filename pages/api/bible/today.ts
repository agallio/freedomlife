import { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment-timezone'

import { getDatabase } from '../../../src/db'
import { GuideInterface } from '../../../src/models/guide.model'
import { BibleInterface } from '../../../src/models/bible.model'

const bibleToday = async (req: NextApiRequest, res: NextApiResponse) => {
  // Init Database
  const database = await getDatabase()
  const {
    GuideModel,
    TBBibleModel,
    BISBibleModel,
    FAYHBibleModel,
    MSGBibleModel,
    NKJVBibleModel,
  } = database

  // Query Deconstruct
  const { version } = req.query

  let query: GuideInterface
  let pl: string, pb: string, alt: string
  let plSpaceSplit: string[], pbSpaceSplit: string[], altSpaceSplit: string[]
  let plDashSplit: string[], pbDashSplit: string[], altDashSplit: string[]

  // Get Guide
  try {
    const todayDate = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
    query = (await GuideModel.findOne({
      date: todayDate,
    })) as GuideInterface
  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }

  // Populate Guide
  pl = query!.pl
  pb = query!.pb
  alt = query!.alt

  // Split Guide String
  plSpaceSplit = pl.split(' ')
  pbSpaceSplit = pb.split(' ')
  if (alt) {
    altSpaceSplit = alt.split(' ')
  } else {
    altSpaceSplit = []
  }

  // Bible Version Selector (function)
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

  // Passage Array
  const plArr = []
  const pbArr = []
  const altArr = []

  // Perjanjian Lama
  plDashSplit = plSpaceSplit[1].split('-')
  let plColonSplit = plSpaceSplit[1].split(':')
  if (plColonSplit.length > 1) {
    let plColonDashSplit = plColonSplit[1].split('-')

    // Get Passage
    const passage = (await bibleVersion(
      plSpaceSplit[0],
      plColonSplit[0]
    )) as BibleInterface

    // Push Passage
    plArr.push({
      version: version || 'tb',
      book: passage!.book,
      chapter: passage!.chapter,
      passagePlace: `pl-1`,
      data: passage!.verses.filter(
        (item) =>
          item.verse >= Number(plColonDashSplit[0]) &&
          item.verse <= Number(plColonDashSplit[1])
      ),
    })
  } else if (plDashSplit.length > 1) {
    let place = 1
    for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
      // Get Passage
      const passage = (await bibleVersion(plSpaceSplit[0], i)) as BibleInterface

      // Push Passage
      plArr.push({
        version: version || 'tb',
        book: passage.book,
        chapter: i,
        passagePlace: `pl-${place++}`,
        data: passage.verses,
      })
    }
  } else {
    // Get Passage
    const passage = (await bibleVersion(
      plSpaceSplit[0],
      plSpaceSplit[1]
    )) as BibleInterface

    // Push Passage
    plArr.push({
      version: version || 'tb',
      book: passage.book,
      chapter: passage.chapter,
      passagePlace: `pl-1`,
      data: passage.verses,
    })
  }

  // Perjanjian Baru
  let pbColonSplit = pbSpaceSplit[1].split(':')
  if (pbColonSplit.length > 1) {
    pbDashSplit = pbColonSplit[1].split('-')

    // Get Passage
    const passage = (await bibleVersion(
      pbSpaceSplit[0],
      pbColonSplit[0]
    )) as BibleInterface

    // Push Passage
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
  } else {
    // Get Passage
    const passage = (await bibleVersion(
      pbSpaceSplit[0],
      pbSpaceSplit[1]
    )) as BibleInterface

    // Push Passage
    pbArr.push({
      version: version || 'tb',
      book: passage.book,
      chapter: passage.chapter,
      passagePlace: `pb`,
      data: passage.verses,
    })
  }

  // Alt (Tambahan) (February 2020)
  if (alt && altSpaceSplit.length > 1) {
    altDashSplit = altSpaceSplit[1].split('-')
    let altColonSplit = altSpaceSplit[1].split(':')
    if (altColonSplit.length > 1) {
      let altColonDashSplit = altColonSplit[1].split('-')

      // Get Passage
      const passage = (await bibleVersion(
        altSpaceSplit[0],
        altColonSplit[0]
      )) as BibleInterface

      // Push Passage
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
    } else if (altDashSplit.length > 1) {
      let place = 1
      for (let i = Number(altDashSplit[0]); i <= Number(altDashSplit[1]); i++) {
        // Get Passage
        const passage = (await bibleVersion(
          altSpaceSplit[0],
          i
        )) as BibleInterface

        // Push Passage
        altArr.push({
          version: version || 'tb',
          book: passage.book,
          chapter: i,
          passagePlace: `alt-${place++}`,
          data: passage.verses,
        })
      }
    } else {
      // Get Passage
      const passage = (await bibleVersion(
        altSpaceSplit[0],
        altSpaceSplit[1]
      )) as BibleInterface

      // Push Passage
      altArr.push({
        version: version || 'tb',
        book: passage.book,
        chapter: passage.chapter,
        passagePlace: `alt-1`,
        data: passage.verses,
      })
    }
  }

  let plList = []
  for (let i = 1; i <= plArr.length; i++) {
    plList.push(`pl-${i}`)
  }

  let altList = []
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

  await res.json(data)
}

export default bibleToday
