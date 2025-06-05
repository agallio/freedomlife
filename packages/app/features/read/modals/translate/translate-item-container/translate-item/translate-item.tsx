import { View } from 'react-native'

// Components
import { Text } from '../../../../../../components/text'
import ListItem from '../../../../../../components/list-item'
import TranslateItemDownloadButton from '../../translate-item-download-button'

// Contexts
import { useReadPassagePersistedContext } from '../../../../contexts/read-passage.context'

export type TranslateItemComponentProps = {
  active: boolean
  version: { key: string; name: string }
  disabled?: boolean
  onClick: (_bibleVersion: string) => void
}

export default function TranslateItemComponent({
  active,
  version,
  disabled,
  onClick,
}: TranslateItemComponentProps) {
  const { guidedEnabled } = useReadPassagePersistedContext()

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

        {!disabled && !guidedEnabled && version.key !== 'tsi' && (
          <TranslateItemDownloadButton version={version} active={active} />
        )}
      </View>
    </ListItem>
  )
}
