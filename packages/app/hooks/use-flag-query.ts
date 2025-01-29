import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Utils
import { apiUrl } from '../utils/constants'

// Types
import type { FlagDataResponse } from '../types'

const getFlag = async (
  name: string,
): Promise<{ data: FlagDataResponse; error: string | null }> => {
  const { data } = await axios.get(`${apiUrl}/api/flags?flags=${name}`)
  return data
}

export function useFlagQuery({
  name,
  enabled = false,
}: {
  name: string
  enabled?: boolean
}) {
  const {
    data: rawData,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['flag', name],
    queryFn: () => getFlag(name),

    // Other options
    enabled,
    staleTime: 5 * 60 * 1000, // 5 min
    networkMode: 'offlineFirst',
    meta: {
      errorMessage: 'error from useFlagQuery',
    },
  })

  const data = rawData?.data ? rawData.data : undefined

  return { data, error, isError, isLoading, refetch }
}
