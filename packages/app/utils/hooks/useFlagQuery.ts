import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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

    // Other options
    retry: false,
    staleTime: 0,
    meta: {
      errorMessage: 'error from flagQuery',
    },
  })

  const data = queryData.data
    ? { enable: queryData.data.enable, context: queryData.data.context }
    : undefined

  return { ...queryData, data }
}
