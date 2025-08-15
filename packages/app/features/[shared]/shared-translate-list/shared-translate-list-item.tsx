import type { ReactNode } from 'react'
import { View } from 'react-native'

// Components
import ListItem from '../../../components/list-item'
import { Text } from '../../../components/text'

// Types
import type { SharedTranslateListProps } from './types'

export default function SharedTranslateListItem({
  active,
  version,
  disabled,
  DownloadButtonComponent,
  onClick,
}: {
  active: boolean
  version: { key: string; name: string }
  disabled?: boolean
  DownloadButtonComponent?: ReactNode
  onClick: SharedTranslateListProps['handleVersionClick']
}) {
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

        {DownloadButtonComponent}
      </View>
    </ListItem>
  )
}
