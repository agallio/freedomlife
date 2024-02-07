import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Utils
import dayjs from '../dayjs'
import { apiUrl } from '../constants'

// Types
import type { BibleDataResponse, BibleGuideDataResponse } from 'app/types'

const fetchBibleByDate = async (
  date: string,
  bibleVersion: string,
): Promise<BibleGuideDataResponse> => {
  const { data } = await axios.get(
    `${apiUrl}/api/bible/${date}/${bibleVersion}`,
  )
  return data.data
}

const fetchBibleByPassage = async (
  passage: string,
  bibleVersion: string,
): Promise<BibleDataResponse> => {
  const { data } = await axios.get(
    `${apiUrl}/api/bible?passage=${passage || 'kej-1'}&version=${bibleVersion}`,
  )
  return data.data
}

export function useBibleByDateQuery({
  date,
  bibleVersion,
  enabled,
}: {
  date: string
  bibleVersion: string
  enabled: boolean
}) {
  const computedDate = date || dayjs().format('DD-MM-YYYY')

  return useQuery({
    queryKey: ['bible', computedDate, bibleVersion],
    queryFn: () => fetchBibleByDate(computedDate, bibleVersion),

    // Other options
    enabled,
    meta: {
      errorMessage: 'error from bibleByDate',
    },
  })
}

export function useBibleByPassageQuery({
  passage,
  bibleVersion,
  enabled,
}: {
  passage: string
  bibleVersion: string
  enabled: boolean
}) {
  return useQuery({
    queryKey: ['bible', passage, bibleVersion],
    queryFn: () => fetchBibleByPassage(passage, bibleVersion),

    // Other options
    enabled,
    meta: {
      errorMessage: 'error from bibleByPassage',
    },
  })
}
