import momentTz from 'moment-timezone';
import 'moment/locale/id';

import { getDatabase } from 'db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel2020 } = database;

  const todayDate = momentTz.tz('Asia/Jakarta').format('DD-MM-YYYY');

  GuideModel2020.find({ date: todayDate })
    .then((guide) => {
      let plSplit = guide[0]._doc.pl.split(' ');
      let pbSplit = guide[0]._doc.pb.split(' ');
      let altSplit = guide[0]._doc.alt.split(' ');

      let plNameSplit = guide[0]._doc.pl_name.split(' ');
      let plDashSplit =
        plNameSplit.length === 2
          ? plNameSplit[1].split('-')
          : plNameSplit[2].split('-');
      let plChapter = [];
      for (let i = plDashSplit[0]; i <= plDashSplit[1]; i++) {
        plChapter.push(String(i));
      }

      let pbColonSplit = pbSplit[1].split(':');
      let pbDashSplit =
        pbColonSplit.length === 2 ? pbColonSplit[1].split('-') : '';

      const newGuide = {
        ...guide[0]._doc,
        date_name: momentTz.tz('Asia/Jakarta').format('dddd, LL'),
        pl_length: plChapter.length,
        pl_book: plSplit[0],
        // PL 1
        pl1_chapter: plChapter.length > 0 ? plChapter[0] : plSplit[1],
        pl1_name:
          plChapter.length > 0
            ? plNameSplit.length === 2
              ? `${plNameSplit[0]} ${plChapter[0]}`
              : `${plNameSplit[0]} ${plNameSplit[1]} ${plChapter[0]}`
            : '',
        // PL 2
        pl2_chapter: plChapter[1],
        pl2_name:
          plChapter.length > 1
            ? plNameSplit.length === 2
              ? `${plNameSplit[0]} ${plChapter[1]}`
              : `${plNameSplit[0]} ${plNameSplit[1]} ${plChapter[1]}`
            : '',
        // PL 3
        pl3_chapter: plChapter.length > 2 ? plChapter[2] : '',
        pl3_name:
          plChapter.length > 2
            ? plNameSplit.length === 2
              ? `${plNameSplit[0]} ${plChapter[2]}`
              : `${plNameSplit[0]} ${plNameSplit[1]} ${plChapter[2]}`
            : '',
        // PB
        pb_book: pbSplit[0],
        pb_chapter: pbColonSplit.length === 2 ? pbColonSplit[0] : pbSplit[1],
        pb_verse_min: pbColonSplit.length === 2 ? pbDashSplit[0] : '',
        pb_verse_max: pbColonSplit.length === 2 ? pbDashSplit[1] : '',
        // ALT
        alt_book: altSplit[0],
        alt_chapter: altSplit[1],
      };

      res.json(newGuide);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
