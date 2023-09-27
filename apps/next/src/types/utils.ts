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
  error: AxiosError<any> | null
  isError: boolean
  isGuideError?: boolean
  isLoading: boolean
  refetch: (_?: {
    throwOnError: boolean
    cancelRefetch: boolean
  }) => Promise<UseQueryResult>
}
