import moment from 'moment';

import { getDatabase } from '../../../../src/db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel2020 } = database;

  const todayDate = moment().format('DD-MM-YYYY');

  const guide = await GuideModel2020.find({ date: todayDate.toString() }).catch(
    err => {
      console.log(err);
      res.status(500).json(err);
    }
  );

  res.json(guide[0]);
};
