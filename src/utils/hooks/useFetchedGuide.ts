// Core
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

// Utils
import dayjs from '../dayjs'

// Context
import { useGuide } from '@/store/Guide'

// Types
import type { QueryResult } from '@/types/utils'
import type { GuideDataResponse } from '@/types/api'

const getGuides = async () => {
  const { data } = await axios.get(`/api/guide/month/${dayjs().format('MM')}`)
  return data
}

const getGuideByDate = async (guideDate: string) => {
  const { data } = await axios.get(
    `/api/guide/${guideDate || dayjs().format('DD-MM-YYYY')}`
  )
  return data
}

export const useGuides = (): QueryResult<GuideDataResponse[] | undefined> => {
  const { data, error, isError, isLoading, refetch } = useQuery<
    { data: GuideDataResponse[] },
    AxiosError
  >('guides', getGuides)

  return { data: data?.data, error, isError, isLoading, refetch }
}

export const useGuideByDate = (): QueryResult<
  GuideDataResponse | undefined
> => {
  const {
    guideState: { guideDate },
    guideDispatch,
  } = useGuide()

  const { data, error, isError, isLoading, refetch } = useQuery<
    {
      data: GuideDataResponse
    },
    AxiosError
  >(['guides', guideDate], () => getGuideByDate(guideDate), {
    retry: false,
    enabled: false,
  })

  useEffect(() => {
    if (data) {
      guideDispatch({ type: 'SET_GUIDE_DATA', data: data.data })
    }
  }, [data])

  return { data: data?.data, error, isError, isLoading, refetch }
}
