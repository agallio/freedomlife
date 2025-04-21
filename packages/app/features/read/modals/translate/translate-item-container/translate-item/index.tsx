import { memo, useMemo } from 'react'

// Components
import TranslateItemComponent from './translate-item'

// Contexts
import { useNetworkConnectionContext } from '../../../../../../providers/network'
import { useReadLocalDatabaseMobile } from '../../../../local-databases/mobile/index.mobile'

// Types
import type { TranslateItemProps } from './types'

function TranslateItem(props: TranslateItemProps) {
  const { isOffline } = useNetworkConnectionContext()
  const { downloadedData } = useReadLocalDatabaseMobile()

  // Constants
  const isDownloaded = useMemo(
    () => downloadedData[props.version.key] === 1189,
    [downloadedData, props.version.key],
  )

  const disabled = props.isLoading || (isOffline && !isDownloaded)

  return <TranslateItemComponent {...props} disabled={disabled} />
}

export default memo(TranslateItem)
