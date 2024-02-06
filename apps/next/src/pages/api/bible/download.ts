import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

// Utils
import { supabase } from '~/utils/supabase'
import rateLimit from '~/utils/rate-limit'
import { localDatabaseTables } from '~/database/dexie'

const limiter = rateLimit()

export const config = {
  api: {
    responseLimit: '7mb',
  },
}

export default async function downloadBiblePassage(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ data: null, error: 'Method not allowed.' })
  }

  const { version } = req.body

  if (!version) {
    return res.status(400).json({
      data: null,
      error: `Data 'version' is missing.`,
    })
  }

  const bibleVersions = Object.keys(localDatabaseTables)

  if (!bibleVersions.includes(version)) {
    return res.status(400).json({
      data: null,
      error: `Bible with version '${version}' not found.`,
    })
  }

  const filename = `${version}_bible.json`

  const {
    data: { publicUrl },
  } = supabase.storage.from('bibles').getPublicUrl(filename)

  try {
    await limiter.check(res, 25, 'API_RATE_LIMIT')
  } catch (e) {
    return res.status(429).json({ data: null, error: 'Rate limit exceeded.' })
  }

  if (publicUrl) {
    try {
      const response = await axios.get(publicUrl)

      if (response.data) {
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
        return res.json({ data: response.data, error: null })
      }
    } catch (e) {
      console.error(e)
      return res.status(500).json({
        data: null,
        error: `Failed to fetch bible database (version: ${version}, filename: ${filename})`,
      })
    }
  } else {
    return res
      .status(404)
      .json({ data: null, error: 'Bible database not found.' })
  }
}
