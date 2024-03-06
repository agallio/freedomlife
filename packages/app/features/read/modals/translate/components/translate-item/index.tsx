import { memo } from 'react'

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
>

function TranslateItem(props: TranslateItemProps) {
  const { isOffline } = useNetworkConnectionContext()
  const { downloadedData } = useReadLocalDatabaseNative()

  // Constants
  const isDownloaded = downloadedData[props.version.key] === 1189

  return (
    <TranslateItemComponent
      {...props}
      isOffline={isOffline}
      isDownloaded={isDownloaded}
    />
  )
}

export default memo(TranslateItem)
