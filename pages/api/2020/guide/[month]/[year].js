import { getDatabase } from 'db'

export default async (req, res) => {
  const database = await getDatabase()
  const { GuideModel2020 } = database

  const { month, year } = req.query

  GuideModel2020.find({
    $and: [{ month }, { year }],
  })
    .sort('date')
    .then((guide) => {
      res.json(guide)
      res.end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
}
