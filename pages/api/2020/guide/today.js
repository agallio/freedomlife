import momentTz from 'moment-timezone';
import 'moment/locale/id';

import { getDatabase } from 'db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel2020 } = database;

  const todayDate = momentTz.tz('Asia/Jakarta').format('DD-MM-YYYY');

  GuideModel2020.find({ date: todayDate })
    .then((guide) => {
      const newGuide = {
        ...guide[0]._doc,
        date_name: momentTz.tz('Asia/Jakarta').format('dddd, LL'),
      };
      res.json(newGuide);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
