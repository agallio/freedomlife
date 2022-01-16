// Core
import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'

// Utils
import dayjs from '../dayjs'

// Context
import { useGuide } from '@/store/Guide'

// Types
import type { BibleDataResponse, BibleGuideDataResponse } from '@/types/api'
import type { QueryResult } from '@/types/utils'

const getBibleByDate = async (guideDate: string, bibleVersion: string) => {
  const { data } = await axios.get(
    `/api/bible/${guideDate || dayjs().format('DD-MM-YYYY')}/${bibleVersion}`
  )
  return data
}

const getBibleByPassage = async (passage: string, bibleVersion: string) => {
  const { data } = await axios.get(
    `/api/bible?passage=${passage || 'kej-1'}&version=${bibleVersion}`
  )
  return data
}

export const useBibleByDate = (
  bibleVersion: string
): QueryResult<BibleGuideDataResponse | undefined> => {
  const {
    guideState: { guideDate },
  } = useGuide()

  const { data, error, isError, isLoading, refetch } = useQuery<
    { data: BibleGuideDataResponse },
    AxiosError
  >(
    ['bibles', guideDate, bibleVersion],
    () => getBibleByDate(guideDate, bibleVersion),
    { enabled: false, refetchOnWindowFocus: false }
  )

  return { data: data?.data, error, isError, isLoading, refetch }
}

export const useBibleByPassage = (
  bibleVersion: string,
  biblePassage: string
): QueryResult<BibleDataResponse | undefined> => {
  const { data, error, isError, isLoading, refetch } = useQuery<
    { data: BibleDataResponse },
    AxiosError
  >(
    ['bibles', biblePassage, bibleVersion],
    () => getBibleByPassage(biblePassage, bibleVersion),
    { enabled: false, refetchOnWindowFocus: false }
  )

  return { data: data?.data, error, isError, isLoading, refetch }
}
