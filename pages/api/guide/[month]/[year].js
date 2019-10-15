import { getDatabase } from '../../../../src/db';

export default async (req, res) => {
  const database = await getDatabase();
  const { GuideModel } = database;

  const { month, year } = req.query;

  GuideModel.find({
    $and: [{ month }, { year }]
  })
    .then(guide => {
      res.json(guide);
    })
    .catch(err => res.status(500).json(err));
};
