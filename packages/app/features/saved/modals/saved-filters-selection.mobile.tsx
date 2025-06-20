import { FlatList, View } from 'react-native'
import { useColorScheme } from 'react-native'
import { CheckIcon } from 'react-native-heroicons/solid'
import { BookmarkIcon as BookmarkIconOutline } from 'react-native-heroicons/outline'
import { Text } from '../../../components/text'
import { highlighterColors } from '../../../utils/constants'
import ListItem from '../../../components/list-item'
import { cn, getIconColor } from '../../../utils/helpers'

export const filters = Object.entries(highlighterColors).map(
  ([key, value]) => ({
    type: key === 'bookmark' ? 'bookmark' : 'highlight',
    colorName: key,
    color: value.color,
  }),
)

export default function SavedFiltersSelectionScreen() {
  const colorScheme = useColorScheme()

  const iconColor = getIconColor(colorScheme)

  return (
    <FlatList
      data={filters}
      renderItem={({ item }) => (
        <ListItem>
          <View className="w-full flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              {item.type === 'highlight' ? (
                <View className={cn('h-6 w-6 rounded-full', item.color)} />
              ) : (
                <View className="h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-800">
                  <BookmarkIconOutline size={14} color={iconColor} />
                </View>
              )}

              <Text className="capitalize">
                {item.type === 'bookmark' ? 'Marka Buku' : item.colorName}
              </Text>
            </View>

            <CheckIcon size={20} color={iconColor} />
          </View>
        </ListItem>
      )}
      contentContainerClassName="pt-4 px-4 gap-3"
    />
  )
}
