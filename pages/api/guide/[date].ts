import { NextApiRequest, NextApiResponse } from 'next'

import { getDatabase } from '../../../src/db'

const guideByDate = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const database = await getDatabase()
  const { GuideModel } = database

  const { date } = req.query

  try {
    const guide = await GuideModel.findOne({ date: String(date) })

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
        error: { message: 'Guide Not Found. (guide/date)' },
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      ok: false,
      data: null,
      error: { message: 'Internal Server Error. (guide/date)' },
    })
  }
}

export default guideByDate
