import { NextApiRequest, NextApiResponse } from 'next'

import { getDatabase } from '@/db/index'
import dayjs from '@/utils/dayjs'

const guideByMonth = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { GuideModel } = await getDatabase()

  const { monthNumber } = req.query

  try {
    const guides = await GuideModel.find({
      $and: [{ month: monthNumber }, { year: dayjs().format('YYYY') }],
    })
      .sort({ date: 1 })
      .toArray()

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
