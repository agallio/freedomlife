import moment from 'moment-timezone';

import { getDatabase } from '../../../../src/db';

export default async (req, res) => {
  const database = await getDatabase();
  const {
    GuideModel2020,
    TBBibleModel,
    BISBibleModel,
    FAYHBibleModel,
    MSGBibleModel,
    NKJVBibleModel
  } = database;
  const { version } = req.query;

  const plArr = [];
  const pbArr = [];

  const todayDate = moment.tz('Asia/Jakarta').format('DD-MM-YYYY');
  const query = await GuideModel2020.find({ date: todayDate }).catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });

  let pl = query[0].pl;
  let pb = query[0].pb;

  const plSpaceSplit = pl.split(' ');
  const pbSpaceSplit = pb.split(' ');

  let plDashSplit;
  let pbDashSplit;

  console.log(pl, pb);

  const bibleVersion = (abbr, chapter) => {
    switch (version) {
      case 'tb':
        return TBBibleModel.find({
          $and: [{ abbr }, { chapter }]
        });
      case 'bis':
        return BISBibleModel.find({
          $and: [{ abbr }, { chapter }]
        });
      case 'fayh':
        return FAYHBibleModel.find({
          $and: [{ abbr }, { chapter }]
        });
      case 'msg':
        return MSGBibleModel.find({
          $and: [{ abbr }, { chapter }]
        });
      case 'nkjv':
        return NKJVBibleModel.find({
          $and: [{ abbr }, { chapter }]
        });

      default:
        return TBBibleModel.find({
          $and: [{ abbr }, { chapter }]
        });
    }
  };

  // Perjanjian Lama
  plDashSplit = plSpaceSplit[1].split('-');
  let plColonSplit = plSpaceSplit[1].split(':');
  if (plColonSplit.length > 1) {
    let plColonDashSplit = plColonSplit[1].split('-');
    const passage = await bibleVersion(plSpaceSplit[0], plColonDashSplit[0]);
    plArr.push({
      version: version || 'tb',
      book: passage[0].book,
      chapter: passage[0].chapter,
      passagePlace: `pl-1`,
      data: passage[0].verses.filter(
        item =>
          item.verse >= Number(plColonDashSplit[0]) &&
          item.verse <= Number(plColonDashSplit[1])
      )
    });
  } else if (plDashSplit.length > 1) {
    let place = 1;
    for (let i = Number(plDashSplit[0]); i <= plDashSplit[1]; i++) {
      const passage = await bibleVersion(plSpaceSplit[0], i);
      plArr.push({
        version: version || 'tb',
        book: passage[0].book,
        chapter: i,
        passagePlace: `pl-${place++}`,
        data: passage[0].verses
      });
    }
  } else {
    const passage = await bibleVersion(plSpaceSplit[0], plSpaceSplit[1]);
    plArr.push({
      version: version || 'tb',
      book: passage[0].book,
      chapter: passage[0].chapter,
      passagePlace: `pl-1`,
      data: passage[0].verses
    });
  }

  // Perjanjian Baru
  let pbColonSplit = pbSpaceSplit[1].split(':');
  if (pbColonSplit.length > 1) {
    pbDashSplit = pbColonSplit[1].split('-');
    const passage = await bibleVersion(pbSpaceSplit[0], pbColonSplit[0]);
    pbArr.push({
      version: version || 'tb',
      book: passage[0].book,
      chapter: passage[0].chapter,
      passagePlace: `pb`,
      data: passage[0].verses.filter(
        item =>
          item.verse >= Number(pbDashSplit[0]) &&
          item.verse <= Number(pbDashSplit[1])
      )
    });
  } else {
    const passage = await bibleVersion(pbSpaceSplit[0], pbSpaceSplit[1]);
    pbArr.push({
      version: version || 'tb',
      book: passage[0].book,
      chapter: passage[0].chapter,
      passagePlace: `pb`,
      data: passage[0].verses
    });
  }

  let plList = [];
  for (let i = 1; i <= plArr.length; i++) {
    plList.push(`pl-${i}`);
  }

  const data = {
    passage: [...plList, 'pb'],
    pl: [...plArr],
    pb: [...pbArr]
  };

  await res.json(data);
};
