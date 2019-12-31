import moment from 'moment';

import { getDatabase } from '../../../src/db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel } = database;

  const todayDate = moment()
    .tz('Asia/Jakarta')
    .format('DD-MM-YYYY');

  GuideModel.find({ date: todayDate })
    .then(guide => {
      res.json(guide[0]);
    })
    .catch(err => res.status(500).json(err));
};
