import moment from 'moment';

import { getDatabase } from '../../../../src/db';

export default async (req, res) => {
  const { date } = req.query;
  const database = await getDatabase();
  const { GuideModel2020, BibleModel } = database;

  const plArr = [];
  const pbArr = [];

  const thisDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
  const query = await GuideModel2020.find({ date: thisDate }).catch(err =>
    res.status(500).json({ err })
  );

  let pl = query[0].pl;
  let pb = query[0].pb;

  const plSpaceSplit = pl.split(' ');
  const pbSpaceSplit = pb.split(' ');

  let plDashSplit;
  let pbDashSplit;

  // Perjanjian Lama
  plDashSplit = plSpaceSplit[1].split('-');
  let plColonSplit = plSpaceSplit[1].split(':');
  if (plColonSplit.length > 1) {
    let plColonDashSplit = plColonSplit[1].split('-');
    const passage = await BibleModel.find({
      $and: [{ abbr: plSpaceSplit[0] }, { chapter: plColonSplit[0] }]
    });
    plArr.push({
      version: 'tb',
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
      const passage = await BibleModel.find({
        $and: [{ abbr: plSpaceSplit[0] }, { chapter: i }]
      });
      plArr.push({
        version: 'tb',
        book: passage[0].book,
        chapter: i,
        passagePlace: `pl-${place++}`,
        data: passage[0].verses
      });
    }
  } else {
    const passage = await BibleModel.find({
      $and: [{ abbr: plSpaceSplit[0] }, { chapter: plSpaceSplit[1] }]
    });
    plArr.push({
      version: 'tb',
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
    const passage = await BibleModel.find({
      $and: [{ abbr: pbSpaceSplit[0] }, { chapter: pbColonSplit[0] }]
    });
    pbArr.push({
      version: 'tb',
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
    const passage = await BibleModel.find({
      $and: [{ abbr: pbSpaceSplit[0] }, { chapter: pbSpaceSplit[1] }]
    });
    console.log(passage);
    pbArr.push({
      version: 'tb',
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
