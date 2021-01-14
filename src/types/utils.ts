import { AxiosError, AxiosResponse } from 'axios'
import { ApiResponse, GuideDataResponse } from './api'

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
  response: AxiosResponse<ApiResponse<GuideDataResponse>> | undefined
  revalidate: () => Promise<boolean>
}
