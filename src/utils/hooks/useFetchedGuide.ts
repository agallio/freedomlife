import { useEffect } from 'react'

import dayjs from '../dayjs'
import useRequest from './useRequest'
import { useDispatchGuide, useGuide } from '@/store/index'

// Types
import type { FetchedGuideHooks } from '@/types/utils'
import type { ApiResponse, GuideDataResponse } from '@/types/api'

const useFetchedGuide = (): FetchedGuideHooks => {
  const guideDispatch = useDispatchGuide()
  const { guideDate } = useGuide()

  const { data, error, isValidating, mutate } = useRequest<
    ApiResponse<GuideDataResponse>
  >({
    url: `/api/guide/${guideDate || dayjs().format('DD-MM-YYYY')}`,
  })

  useEffect(() => {
    guideDispatch({ type: 'SET_GUIDE_DATA', data: data?.data })
  }, [data])

  return { data, error, isValidating, mutate }
}

export default useFetchedGuide
