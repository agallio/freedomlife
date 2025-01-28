import { memo } from 'react'

// Components
import TranslateItemComponent, {
  type TranslateItemComponentProps,
} from './translate-item'

type TranslateItemProps = Omit<
  TranslateItemComponentProps,
  'isDownloaded' | 'isOffline'
> & { isLoading?: boolean }

function TranslateItem(props: TranslateItemProps) {
  const disabled = props.isLoading

  return <TranslateItemComponent {...props} disabled={disabled} />
}

export default memo(TranslateItem)
