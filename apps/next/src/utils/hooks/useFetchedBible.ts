import { useEffect, useMemo } from 'react'
import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useLiveQuery } from 'dexie-react-hooks'

// Context
import { useGuide } from '~/contexts/GuideContext'

// Database
import { localDatabaseTables } from '~/database/dexie'

// Utils
import dayjs from '../dayjs'

// Types
import type { BibleDataResponse, BibleGuideDataResponse } from '~/types/api'
import type { QueryResult } from '~/types/utils'

const getBibleByDate = async (guideDate: string, bibleVersion: string) => {
  const { data } = await axios.get(
    `/api/bible/${guideDate || dayjs().format('DD-MM-YYYY')}/${bibleVersion}`,
  )
  return data
}

const getBibleByPassage = async (passage: string, bibleVersion: string) => {
  const { data } = await axios.get(
    `/api/bible?passage=${passage || 'kej-1'}&version=${bibleVersion}`,
  )
  return data
}

export const useBibleByDate = (
  bibleVersion: string,
): QueryResult<BibleGuideDataResponse | undefined> => {
  const { guideDate } = useGuide()

  const { data, error, isError, isLoading, refetch } = useQuery<
    { data: BibleGuideDataResponse },
    AxiosError
  >({
    queryKey: ['bibles', guideDate, bibleVersion],
    queryFn: () => getBibleByDate(guideDate, bibleVersion),
    enabled: false,
    refetchOnWindowFocus: false,
  })

  return { data: data?.data, error, isError, isLoading, refetch }
}

export const useBibleByPassage = (
  bibleVersion: string,
  biblePassage: string,
  chapterQueryValid: boolean,
): QueryResult<BibleDataResponse | undefined> => {
  // Queries
  // Get bible data from local
  const localData = useLiveQuery(() => {
    if (localDatabaseTables[bibleVersion]) {
      return localDatabaseTables[bibleVersion]!.filter((data) => {
        const [abbr, chapter] = biblePassage.split('-')

        return (
          data.version === bibleVersion &&
          data.abbr === abbr &&
          data.chapter === chapter
        )
      }).toArray()
    }

    return []
  }, [bibleVersion, biblePassage])

  const queryData = useQuery<{ data: BibleDataResponse }, AxiosError>({
    queryKey: ['bibles', biblePassage, bibleVersion],
    queryFn: () => getBibleByPassage(biblePassage, bibleVersion),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  // Memoized Values
  const formattedData = useMemo(() => {
    if (localData && localData.length > 0) {
      return {
        book: localData[0]!.book,
        chapter: Number(localData[0]!.chapter),
        version: localData[0]!.version,
        data: localData[0]!.verses,
      } as BibleDataResponse
    }

    return queryData.data?.data
  }, [queryData.data?.data, localData])

  // Lifecycle —— Side-effects
  useEffect(() => {
    // If the bible data from local doesn't exists,
    // Fetch the bible data from server.
    if (localData && localData.length === 0 && chapterQueryValid) {
      queryData.refetch()
    }
  }, [localData])

  return { ...queryData, data: formattedData }
}
