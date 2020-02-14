import moment from 'moment';

import { getDatabase } from 'db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel } = database;
  const { date } = req.query;

  const customDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY');

  GuideModel.find({ date: customDate })
    .then(guide => {
      res.json(guide[0]);
    })
    .catch(err => res.status(500).json(err));
};
