import { NextApiRequest, NextApiResponse } from 'next'
import momentTz from 'moment-timezone'
import 'moment/locale/id'

import { getDatabase } from '../../../../src/db'

const guideByMonth = async (req: NextApiRequest, res: NextApiResponse) => {
  const database = await getDatabase()
  const { GuideModel } = database

  const { monthNumber } = req.query

  GuideModel.find({
    $and: [
      { month: monthNumber },
      { year: momentTz.tz('Asia/Jakarta').format('YYYY') },
    ],
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

export default guideByMonth
