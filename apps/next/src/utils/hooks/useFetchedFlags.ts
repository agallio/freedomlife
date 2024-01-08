import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'

// Types
import type { FlagDataResponse, SupabaseFeatureFlag } from '~/types/api'
import type { QueryResult } from '~/types/utils'

const getFlag = async (name: string) => {
  const { data } = await axios.get(`/api/flags?flags=${name}`)
  return data
}

export const useFlagData = (
  name: string,
): QueryResult<FlagDataResponse | undefined> => {
  const {
    data: rawData,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery<{ data: SupabaseFeatureFlag }, AxiosError>(
    ['flag', name],
    () => getFlag(name),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    },
  )

  const data = rawData?.data
    ? { enable: rawData.data.enable, context: rawData.data.context }
    : undefined

  return { data, error, isError, isLoading, refetch }
}
