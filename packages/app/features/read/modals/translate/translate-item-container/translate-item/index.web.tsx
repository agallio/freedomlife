import { memo } from 'react'

// Components
import TranslateItemComponent from './translate-item'

// Types
import type { TranslateItemProps } from './types'

function TranslateItem(props: TranslateItemProps) {
  const disabled = props.isLoading

  return <TranslateItemComponent {...props} disabled={disabled} />
}

export default memo(TranslateItem)
