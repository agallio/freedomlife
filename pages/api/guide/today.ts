import { NextApiRequest, NextApiResponse } from 'next'
import momentTz from 'moment-timezone'
import 'moment/locale/id'

import { getDatabase } from '../../../src/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = await getDatabase()
  const { GuideModel } = database

  const todayDate = momentTz.tz('Asia/Jakarta').format('DD-MM-YYYY')

  GuideModel.find({ date: todayDate })
    .then((guide: any) => {
      res.json({
        ...guide[0]._doc,
        date_name: momentTz.tz('Asia/Jakarta').format('dddd, LL'),
      })
      res.end()
    })
    .catch((err: any) => {
      console.log(err)
      res.status(500).json(err)
    })
}
