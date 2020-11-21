import { useEffect } from 'react'

import { dayjs } from '..'
import useRequest from './useRequest'
import { useDispatchGuide, useGuide } from '../../store'

// Types
import type {
  ApiResponse,
  FetchedGuideHooks,
  GuideDataResponse,
} from '../../types'

const useFetchedGuide = (): FetchedGuideHooks => {
  const guideDispatch = useDispatchGuide()
  const { guideDate } = useGuide()

  const { data, error, isValidating, response, revalidate } = useRequest<
    ApiResponse<GuideDataResponse>
  >({
    url: `/api/guide/${guideDate || dayjs().format('DD-MM-YYYY')}`,
  })

  useEffect(() => {
    guideDispatch({ type: 'SET_GUIDE_DATA', data: data?.data })
  }, [data])

  return { data, error, isValidating, response, revalidate }
}

export default useFetchedGuide
