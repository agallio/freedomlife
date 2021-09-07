import type { AxiosError } from 'axios'
import type { ApiResponse, GuideDataResponse } from './api'

export interface BibleList {
  name: string
  abbr: string
  passage: number
}

// Hooks
export interface FetchedGuideHooks {
  data: ApiResponse<GuideDataResponse> | undefined
  error: AxiosError<unknown> | undefined
  isValidating: boolean
  mutate: any
}
