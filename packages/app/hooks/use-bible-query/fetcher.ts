import axios from 'axios'

// Utils
import { apiUrl } from '../../utils/constants'

// Types
import type { BibleDataResponse, BibleGuideDataResponse } from '../../types'

export const fetchBibleByDate = async (
  date: string,
  bibleVersion: string,
): Promise<BibleGuideDataResponse> => {
  const { data } = await axios.get(
    `${apiUrl}/api/bible/${date}/${bibleVersion}`,
  )
  return data.data
}

export const fetchBibleByPassage = async (
  passage: string,
  bibleVersion: string,
): Promise<BibleDataResponse> => {
  const { data } = await axios.get(
    `${apiUrl}/api/bible?passage=${passage || 'kej-1'}&version=${bibleVersion}`,
  )
  return data.data
}
