import { NextApiRequest, NextApiResponse } from 'next'

import { getDatabase } from '../../../src/db'
import { dayjs } from '../../../src/utils'

const guideToday = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const database = await getDatabase()
  const { GuideModel } = database

  const todayDate = dayjs().format('DD-MM-YYYY')

  try {
    const guide = await GuideModel.findOne({ date: todayDate })

    if (guide) {
      res.json({
        status: 200,
        ok: true,
        data: guide,
        error: null,
      })
    } else {
      res.status(404).json({
        status: 404,
        ok: false,
        data: null,
        error: { message: 'Guide Not Found. (guide/today)' },
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      ok: false,
      data: null,
      error: { message: 'Internal Server Error. (guide/today)' },
    })
  }
}

export default guideToday
