import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Utils
import dayjs from '../utils/dayjs'
import { apiUrl } from '../utils/constants'

// Types
import type { GuideDataResponse } from '../types'

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
    networkMode: 'offlineFirst',
    staleTime: 5 * 60 * 1000, // 5 min
    meta: {
      errorMessage: 'error from guideToday',
    },
  })
}

// Separating the today's query from the specific date query,
// since we'll use a differenct queryKey for the specific date query.
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
    networkMode: 'offlineFirst',
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
    networkMode: 'offlineFirst',
    meta: {
      errorMessage: 'error from guideByMonth',
    },
  })
}
