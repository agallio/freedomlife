import { NextApiRequest, NextApiResponse } from 'next'

import { getDatabase } from '../../../../src/db'
import { dayjs } from '../../../../src/utils'

const guideByMonth = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const database = await getDatabase()
  const { GuideModel } = database

  const { monthNumber } = req.query

  try {
    const guides = await GuideModel.find({
      $and: [{ month: String(monthNumber) }, { year: dayjs().format('YYYY') }],
    }).sort('date')

    if (guides) {
      res.json({
        status: 200,
        ok: true,
        data: guides,
        error: null,
      })
    } else {
      res.status(404).json({
        status: 404,
        ok: false,
        data: null,
        error: { message: 'Guide Not Found. (guide/month)' },
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      ok: false,
      data: null,
      error: { message: 'Internal Server Error. (guide/month)' },
    })
  }
}

export default guideByMonth
