import { View } from 'react-native'

// Components
import { Text } from '../../../../../../components/text'
import ListItem from '../../../../../../components/list-item'
import TranslateItemDownloadButton from '../translate-item-download-button'

// Contexts
import { useReadPassageContext } from '../../../../contexts/read-passage.context'

export type TranslateItemComponentProps = {
  active: boolean
  version: { key: string; name: string }
  isOffline?: boolean
  isDownloaded?: boolean
  onClick: (_bibleVersion: string) => void
}

export default function TranslateItemComponent({
  active,
  version,
  isOffline = false,
  isDownloaded = false,
  onClick,
}: TranslateItemComponentProps) {
  const { guided } = useReadPassageContext()

  // Constants
  const disabled = isOffline && !isDownloaded

  return (
    <ListItem
      active={active}
      onClick={() => onClick(version.key)}
      disabled={disabled}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-[2]">
          <Text>{version.name}</Text>
        </View>

        {!disabled && !guided.enabled && (
          <TranslateItemDownloadButton version={version} active={active} />
        )}
      </View>
    </ListItem>
  )
}
