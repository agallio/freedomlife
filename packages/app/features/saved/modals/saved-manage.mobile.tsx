import { useColorScheme, View } from 'react-native'
import {
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
  TrashIcon,
} from 'react-native-heroicons/solid'

// Components
import { Text } from '../../../components/text'
import ListItem from '../../../components/list-item'

// Utils
import { getIconColor } from '../../../utils/helpers'

export default function SavedManageScreen() {
  const colorScheme = useColorScheme()

  // Constants
  const iconColor = getIconColor(colorScheme)
  const deleteIconColor = colorScheme === 'light' ? '#ef4444' : '#f87171'

  return (
    <View className="gap-2 p-4">
      <ListItem>
        <View className="flex-row items-center gap-2">
          <ArrowUpOnSquareIcon size={20} color={iconColor} />
          <Text>Ekspor Data</Text>
        </View>
      </ListItem>
      <ListItem>
        <View className="flex-row items-center gap-2">
          <ArrowDownOnSquareIcon size={20} color={iconColor} />
          <Text>Impor Data</Text>
        </View>
      </ListItem>
      <ListItem>
        <View className="flex-row items-center gap-2">
          <TrashIcon size={19} color={deleteIconColor} />
          <Text className="text-red-500 dark:text-red-400">
            Hapus Semua Data
          </Text>
        </View>
      </ListItem>
    </View>
  )
}
