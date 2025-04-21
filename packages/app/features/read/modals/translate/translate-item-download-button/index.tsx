import { Platform } from 'react-native'
import * as Burnt from 'burnt'

// Contexts
import {
  useReadLocalDatabaseMutationMobile,
  useReadLocalDatabaseMobile,
} from '../../../local-databases/mobile/index.mobile'

// Utils
import TranslateItemDownloadButtonComponent from './translate-item-download-button'

// Types
import type { TranslateItemDownloadButtonProps } from './types'

export default function TranslateItemDownloadButton({
  version,
  active,
}: TranslateItemDownloadButtonProps) {
  const { downloadedData } = useReadLocalDatabaseMobile()

  // Constants
  const isDownloaded = downloadedData[version.key] === 1189

  // Mutations
  const { status, mutate } = useReadLocalDatabaseMutationMobile({
    onSuccess: () => {
      const title = 'Alkitab Terunduh'

      Burnt.toast({
        preset: 'done',
        duration: 1.5,
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
        duration: 1.5,
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
