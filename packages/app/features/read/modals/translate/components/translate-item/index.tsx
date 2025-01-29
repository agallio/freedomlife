import { memo, useMemo } from 'react'

// Components
import TranslateItemComponent, {
  type TranslateItemComponentProps,
} from './translate-item'

// Contexts
import { useNetworkConnectionContext } from '../../../../../../providers/network'
import { useReadLocalDatabaseNative } from '../../../../local-databases/native/index.native'

type TranslateItemProps = Omit<
  TranslateItemComponentProps,
  'isDownloaded' | 'isOffline'
> & { isLoading?: boolean }

function TranslateItem(props: TranslateItemProps) {
  const { isOffline } = useNetworkConnectionContext()
  const { downloadedData } = useReadLocalDatabaseNative()

  // Constants
  const isDownloaded = useMemo(
    () => downloadedData[props.version.key] === 1189,
    [downloadedData, props.version.key],
  )

  const disabled = props.isLoading || (isOffline && !isDownloaded)

  return <TranslateItemComponent {...props} disabled={disabled} />
}

export default memo(TranslateItem)
