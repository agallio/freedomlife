import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@/utils/supabase'

const guideByDate = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { date } = req.query

  if (!date) {
    return res
      .status(404)
      .json({ data: null, error: "Param 'date' is missing" })
  }

  const { data, error } = await supabase
    .from('guides')
    .select()
    .filter('date', 'eq', String(date))

  if (error) return res.status(500).json({ data: null, error: error.message })

  if (data) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    return res.json({ data: data[0], error: null })
  } else {
    return res.status(404).json({ data: null, error: 'Guide not found.' })
  }
}

export default guideByDate
