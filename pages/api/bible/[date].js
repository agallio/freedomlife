import moment from 'moment';

import { getDatabase } from '../../../src/db';

export default async (req, res) => {
  const { date } = req.query;
  const database = await getDatabase();
  const { GuideModel, BibleModel } = database;

  const plArr = [];
  const pb1Arr = [];
  const pb2Arr = [];

  const thisDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
  const query = await GuideModel.find({ date: thisDate }).catch(err =>
    res.status(500).json({ err })
  );

  let pl = query[0].pl;
  let pb1 = query[0].pb1;
  let pb2 = query[0].pb2;

  const plSpaceSplit = pl.split(' ');
  const pb1SpaceSplit = pb1.split(' ');
  const pb2SpaceSplit = pb2.split(' ');

  let plDashSplit;
  let pb1DashSplit;
  let pb2DashSplit;

  // Perjanjian Lama
  plDashSplit = plSpaceSplit[1].split('-');
  if (plDashSplit.length > 1) {
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

  // Perjanjian Baru 1
  pb1DashSplit = pb1SpaceSplit[1].split('-');
  if (pb1DashSplit.length > 1) {
    let place = 1;
    for (i = Number(pb1DashSplit[0]); i <= pb1DashSplit[1]; i++) {
      const passage = await BibleModel.find({
        $and: [{ abbr: pb1SpaceSplit[0] }, { chapter: i }]
      });
      pb1Arr.push({
        version: 'tb',
        book: passage[0].book,
        chapter: i,
        passagePlace: `pb1`,
        data: passage[0].verses
      });
    }
  } else {
    const passage = await BibleModel.find({
      $and: [{ abbr: pb1SpaceSplit[0] }, { chapter: pb1SpaceSplit[1] }]
    });
    pb1Arr.push({
      version: 'tb',
      book: passage[0].book,
      chapter: passage[0].chapter,
      passagePlace: `pb1`,
      data: passage[0].verses
    });
  }

  // Perjanjian Baru 2
  if (pb2SpaceSplit[0] === 'kis' || pb2SpaceSplit[0] === 'why') {
    let pb2ColonSplit = pb2SpaceSplit[1].split(':');
    if (pb2ColonSplit.length > 1) {
      pb2DashSplit = pb2ColonSplit[1].split('-');
      const passage = await BibleModel.find({
        $and: [{ abbr: pb2SpaceSplit[0] }, { chapter: pb2SpaceSplit[1] }]
      });
      pb2Arr.push({
        version: 'tb',
        book: passage[0].book,
        chapter: passage[0].chapter,
        passagePlace: `pb2`,
        data: passage[0].verses.filter(
          item =>
            item.verse >= Number(pb2DashSplit[0]) &&
            item.verse <= Number(pb2DashSplit[1])
        )
      });
    } else {
      const passage = await BibleModel.find({
        $and: [{ abbr: pb2SpaceSplit[0] }, { chapter: pb2SpaceSplit[1] }]
      });
      pb2Arr.push({
        version: 'tb',
        book: passage[0].book,
        chapter: passage[0].chapter,
        passagePlace: `pb2`,
        data: passage[0].verses
      });
    }
  } else {
    const passage = await BibleModel.find({
      $and: [{ abbr: pb2SpaceSplit[0] }, { chapter: pb2SpaceSplit[1] }]
    });
    pb2Arr.push({
      version: 'tb',
      book: passage[0].book,
      chapter: passage[0].chapter,
      passagePlace: `pb2`,
      data: passage[0].verses
    });
  }

  let plList = [];
  for (let i = 1; i <= plArr.length; i++) {
    plList.push(`pl-${i}`);
  }

  const data = {
    passage: [...plList, 'pb1', 'pb2'],
    pl: [...plArr],
    pb1: [...pb1Arr],
    pb2: [...pb2Arr]
  };

  await res.json(data);
};
