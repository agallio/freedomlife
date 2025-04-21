import type { TranslateItemComponentProps } from './translate-item'

export type TranslateItemProps = Omit<
  TranslateItemComponentProps,
  'isDownloaded' | 'isOffline'
> & { isLoading?: boolean }
