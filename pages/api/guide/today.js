import moment from 'moment';

import { getDatabase } from 'db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel } = database;

  const todayDate = moment().format('DD-MM-YYYY');

  GuideModel.find({ date: todayDate })
    .then(guide => {
      res.json(guide[0]);
    })
    .catch(err => res.status(500).json(err));
};
