import moment from 'moment';

import { getDatabase } from '../../../../src/db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel2020 } = database;

  const todayDate = moment.tz('Asia/Jakarta').format('DD-MM-YYYY');
  console.log(todayDate)

  GuideModel2020.find({ date: todayDate })
    .then(guide => {
      res.json(guide);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
