import { getDatabase } from '../../../../../src/db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel2020 } = database;

  const { month, year } = req.query;

  GuideModel2020.find({
    $and: [{ month }, { year }]
  })
    .then(guide => {
      res.json(guide);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
