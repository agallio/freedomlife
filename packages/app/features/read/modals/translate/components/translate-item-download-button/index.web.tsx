import { CheckCircleIcon } from 'react-native-heroicons/solid'
import * as Burnt from 'burnt'

// Components
import { ToasterWebComponent } from '../../../../../../components/toaster-container.web'

// Contexts
import {
  useReadLocalDatabaseMutationWeb,
  useReadLocalDatabaseWeb,
} from '../../../../local-databases/web/index.web'

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
  const { downloadedData } = useReadLocalDatabaseWeb()

  // Constants
  const isDownloaded = downloadedData[version.key]

  // Mutations
  const { status, mutate } = useReadLocalDatabaseMutationWeb({
    onSuccess: () => {
      Burnt.toast({
        preset: 'done',
        duration: 1.5,
        // @ts-ignore
        title: (
          <ToasterWebComponent
            icon={
              <CheckCircleIcon
                size={24}
                className="text-emerald-900 dark:text-white"
              />
            }
            title="Berhasil Mengunduh Alkitab"
            message={version.name}
          />
        ),
      })
    },
  })

  // Methods
  const onDownloadClick = () => {
    if (isDownloaded) {
      Burnt.toast({
        preset: 'done',
        duration: 1.5,
        // @ts-ignore
        title: (
          <ToasterWebComponent
            icon={
              <CheckCircleIcon
                size={24}
                className="text-emerald-900 dark:text-white"
              />
            }
            title="Alkitab Telah Diunduh"
            message={version.name}
          />
        ),
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
