import { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

// Context
import { useGuide } from '~/contexts/GuideContext'

// Utils
import dayjs from '../dayjs'

// Types
import type { QueryResult } from '~/types/utils'
import type { GuideDataResponse } from '~/types/api'

const getGuides = async (month?: string) => {
  const { data } = await axios.get(
    `/api/guide/month/${month || dayjs().format('MM')}`,
  )
  return data
}

const getGuideByDate = async (guideDate: string) => {
  const { data } = await axios.get(
    `/api/guide/${guideDate || dayjs().format('DD-MM-YYYY')}`,
  )
  return data
}

export const useGuides = (options?: {
  month?: string
}): QueryResult<GuideDataResponse[] | undefined> => {
  const { data, error, isError, isLoading, isFetching, refetch } = useQuery<
    { data: GuideDataResponse[] },
    AxiosError
  >('guides', () => getGuides(options?.month), {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  return {
    data: data?.data,
    error,
    isError,
    isLoading: isLoading || isFetching,
    refetch,
  }
}

export const useGuideByDate = (options?: {
  home?: boolean
}): QueryResult<GuideDataResponse | undefined> => {
  const { guideDate, setGuideData } = useGuide()

  const date = options?.home ? dayjs().format('DD-MM-YYYY') : guideDate

  const { data, error, isError, isLoading, refetch } = useQuery<
    {
      data: GuideDataResponse
    },
    AxiosError
  >(['guides', date], () => getGuideByDate(date), {
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      setGuideData(data.data)
    }
  }, [data])

  return {
    data: data?.data,
    error,
    isError,
    isGuideError:
      (error?.response?.data as { error: string })?.error ===
      'Guide not found.',
    isLoading,
    refetch,
  }
}
