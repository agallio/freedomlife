import { memo } from 'react'

// Components
import TranslateItemComponent, {
  type TranslateItemComponentProps,
} from './translate-item'

type TranslateItemProps = Omit<TranslateItemComponentProps, 'isDownloaded' | 'isOffline'>

function TranslateItem(props: TranslateItemProps) {
  return <TranslateItemComponent {...props} />
}

export default memo(TranslateItem)
