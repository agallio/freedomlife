import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import type { FlagDataResponse } from '../types'

const getFlag = async (
  name: string,
): Promise<{ data: FlagDataResponse; error: string | null }> => {
  const { data } = await axios.get(`/api/flags?flags=${name}`)
  return data
}

export function useFlagQuery(name: string) {
  const {
    data: rawData,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['flag', name],
    queryFn: () => getFlag(name),
    enabled: true,
    refetchOnWindowFocus: false,

    // Other options
    networkMode: 'offlineFirst',
    staleTime: 5 * 60 * 1000, // 5 min
    meta: {
      errorMessage: 'error from useFlagQuery',
    },
  })

  const data = rawData?.data
    ? { enable: rawData.data.enable, context: rawData.data.context }
    : undefined

  return { data, error, isError, isLoading, refetch }
}
