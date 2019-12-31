import moment from 'moment-timezone';

import { getDatabase } from '../../../../src/db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel2020 } = database;

  const todayDate = moment.tz('Asia/Jakarta').format('DD-MM-YYYY');

  GuideModel2020.find({ date: todayDate })
    .then(guide => {
      res.json(guide[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
