import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

// Utils
import { apiUrl } from '../constants'

// Types
import type { FlagDataResponse } from 'app/types'

const fetchFlag = async (name: string): Promise<FlagDataResponse> => {
  const { data } = await axios.get(`${apiUrl}/api/flags?flags=${name}`)
  return data.data
}

export function useFlagQuery(name: string) {
  const queryData = useQuery({
    queryKey: ['flag', name],
    queryFn: () => fetchFlag(name),
    retry: false,
    keepPreviousData: false,
    cacheTime: 0,
    staleTime: 0,
    onError: (error) => {
      console.log(
        'error from flagQuery',
        JSON.stringify((error as AxiosError).response)
      )
    },
  })

  const data = queryData.data
    ? { enable: queryData.data.enable, context: queryData.data.context }
    : undefined

  return { ...queryData, data }
}
