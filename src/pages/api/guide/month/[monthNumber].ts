import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@/utils/supabase'
import dayjs from '@/utils/dayjs'

const guideByMonth = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { monthNumber } = req.query

  if (!monthNumber) {
    return res
      .status(400)
      .json({ data: null, error: "Param 'monthNumber' is missing." })
  }

  if (Number(monthNumber) < 1 || Number(monthNumber) > 12) {
    return res.status(400).json({
      data: null,
      error: "Param 'monthNumber' should be between 1 to 12.",
    })
  }

  const { data, error } = await supabase
    .from('guides')
    .select()
    .filter('month', 'eq', monthNumber)
    .filter('year', 'eq', dayjs().format('YYYY'))
    .order('date', { ascending: true })

  if (error) return res.status(500).json({ data: null, error: error.message })

  if (data) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.json({ data, error: null })
  } else {
    return res.status(404).json({ data: null, error: 'Guides not found.' })
  }
}

export default guideByMonth
