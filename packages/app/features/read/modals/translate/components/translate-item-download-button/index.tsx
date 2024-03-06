import { Platform } from 'react-native'
import * as Burnt from 'burnt'

// Contexts
import {
  useReadLocalDatabaseMutationNative,
  useReadLocalDatabaseNative,
} from '../../../../local-databases/native/index.native'

// Utils
import TranslateItemDownloadButtonComponent from './translate-item-download-button'

type TranslateItemDownloadButtonProps = {
  version: { key: string; name: string }
  active?: boolean
}

export default function TranslateItemDownloadButton({
  version,
  active,
}: TranslateItemDownloadButtonProps) {
  const { downloadedData } = useReadLocalDatabaseNative()

  // Constants
  const isDownloaded = downloadedData[version.key] === 1189

  // Mutations
  const { status, mutate } = useReadLocalDatabaseMutationNative({
    onSuccess: () => {
      const title = 'Alkitab Terunduh'

      Burnt.toast({
        preset: 'done',
        title: Platform.OS === 'ios' ? title : `${title}\n${version.name}`,
        message: Platform.OS === 'ios' ? version.name : undefined,
      })
    },
  })

  // Methods
  const onDownloadClick = () => {
    if (isDownloaded) {
      const title = 'Alkitab Telah Diunduh'

      Burnt.toast({
        preset: 'done',
        title: Platform.OS === 'ios' ? title : `${title}\n${version.name}`,
        message: Platform.OS === 'ios' ? version.name : undefined,
      })
      return
    }

    mutate(version.key)
  }

  return (
    <TranslateItemDownloadButtonComponent
      status={status}
      active={active}
      isDownloaded={isDownloaded}
      onDownloadClick={onDownloadClick}
    />
  )
}
