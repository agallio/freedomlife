import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Utils
import dayjs from '../dayjs'
import { apiUrl } from '../constants'

// Types
import type { GuideDataResponse } from 'app/types'

const fetchGuideByDate = async (date: string): Promise<GuideDataResponse> => {
  const { data } = await axios.get(`${apiUrl}/api/guide/${date}`)
  return data.data
}

const fetchGuideByMonth = async (
  month: string,
): Promise<GuideDataResponse[]> => {
  const { data } = await axios.get(`${apiUrl}/api/guide/month/${month}`)
  return data.data
}

export function useGuideTodayQuery() {
  const dateToday = dayjs().format('DD-MM-YYYY')

  return useQuery({
    queryKey: ['guide', 'today', dateToday],
    queryFn: () => fetchGuideByDate(dateToday),

    // Other options
    retry: false,
    meta: {
      errorMessage: 'error from guideToday',
    },
  })
}

// Separating the today's query from the specific date query, since we'll use the
// caching mechanism from react query to cache the specific date query.
export function useGuideByDateQuery({
  date,
  enabled,
}: {
  date: string
  enabled: boolean
}) {
  return useQuery({
    queryKey: ['guide', date],
    queryFn: () => fetchGuideByDate(date),

    // Other options
    enabled,
    meta: {
      errorMessage: 'error from guideByDate',
    },
  })
}

export function useGuideByMonthQuery(month?: string) {
  const monthNumber = month || dayjs().format('MM')
  return useQuery({
    queryKey: ['guideByMonth', monthNumber],
    queryFn: () => fetchGuideByMonth(monthNumber),

    // Other options
    meta: {
      errorMessage: 'error from guideByMonth',
    },
  })
}
