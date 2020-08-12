import { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment'
import 'moment/locale/id'

import { getDatabase } from '../../../src/db'

const guideByDate = async (req: NextApiRequest, res: NextApiResponse) => {
  const database = await getDatabase()
  const { GuideModel } = database

  const { date } = req.query

  const passageDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY')

  GuideModel.find({ date: passageDate })
    .then((guide: any) => {
      res.json({
        ...guide[0]._doc,
        date_name: moment(date, 'DD-MM-YYYY').format('dddd, LL'),
      })
      res.end()
    })
    .catch((err: any) => {
      console.log(err)
      res.status(500).json(err)
    })
}

export default guideByDate
