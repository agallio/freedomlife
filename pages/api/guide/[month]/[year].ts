import { NextApiRequest, NextApiResponse } from 'next'

import { getDatabase } from '../../../../src/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = await getDatabase()
  const { GuideModel } = database

  const { month, year } = req.query

  GuideModel.find({
    $and: [{ month }, { year }],
  })
    .sort('date')
    .then((guide: any) => {
      res.json(guide)
      res.end()
    })
    .catch((err: any) => {
      console.log(err)
      res.status(500).json(err)
    })
}
