import { type UseQueryResult } from '@tanstack/react-query'

// Types
import type { GuideDataResponse } from '../../../../types'

export type GuideListProps = {
  queryData: UseQueryResult<GuideDataResponse[], Error>
  mobileSelectedGuideMonth?: string
  getGuideHasBeenRead: (_date: string) => boolean
  onGuideClick: (_date: string) => void
  onCheckMarkClick: (_date: string) => void
}
