import type { AxiosError } from 'axios'
import type { UseQueryResult } from 'react-query'

export interface BibleList {
  name: string
  abbr: string
  passage: number
}

// Fetched Hooks
export interface QueryResult<T> {
  data: T
  error: AxiosError<never> | null
  isError: boolean
  isLoading: boolean
  refetch: (options?: {
    throwOnError: boolean
    cancelRefetch: boolean
  }) => Promise<UseQueryResult>
}
