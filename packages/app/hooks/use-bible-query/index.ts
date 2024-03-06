import { useQuery } from '@tanstack/react-query'

// Fetchers
import { fetchBibleByDate, fetchBibleByPassage } from './fetcher'

// Utils
import dayjs from '../../utils/dayjs'

// Types
import type { BibleDataResponse } from '../../types'
import type { GetBibleDataArgs } from '../../features/read/local-databases/types'

export type BibleByDateQueryArgs = {
  date: string
  bibleVersion: string
  enabled: boolean
}

export type BibleByPassageQueryArgs = {
  passage: string
  bibleVersion: string
  enabled: boolean
  localBibleData: {
    isDownloaded: boolean
    getBibleData: (
      _args: GetBibleDataArgs,
    ) => Promise<BibleDataResponse | undefined>
  }
}

export function useBibleByDateQuery({
  date,
  bibleVersion,
  enabled,
}: BibleByDateQueryArgs) {
  const computedDate = date || dayjs().format('DD-MM-YYYY')

  return useQuery({
    queryKey: ['bible', computedDate, bibleVersion],
    queryFn: () => fetchBibleByDate(computedDate, bibleVersion),

    // Other options
    enabled,
    networkMode: 'offlineFirst',
    staleTime: 5 * 60 * 1000, // 5 min
    meta: {
      errorMessage: 'error from bibleByDate',
    },
  })
}

export function useBibleByPassageQuery({
  passage,
  bibleVersion,
  enabled,
  localBibleData,
}: BibleByPassageQueryArgs) {
  return useQuery({
    queryKey: ['bible', passage, bibleVersion],
    queryFn: async () => {
      if (localBibleData.isDownloaded) {
        const data = await localBibleData.getBibleData({
          passage,
          version: bibleVersion,
        })

        return data
      }

      return fetchBibleByPassage(passage, bibleVersion)
    },

    // Other options
    enabled,
    networkMode: 'always',
    staleTime: 5 * 60 * 1000, // 5 min
    meta: {
      errorMessage: 'error from bibleByPassage',
    },
  })
}
