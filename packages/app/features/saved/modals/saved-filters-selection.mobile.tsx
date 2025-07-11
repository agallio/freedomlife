import { useCallback } from 'react'
import { FlatList, View, useColorScheme } from 'react-native'
import { CheckIcon } from 'react-native-heroicons/solid'
import { BookmarkIcon as BookmarkIconOutline } from 'react-native-heroicons/outline'

// Components
import { Text } from '../../../components/text'
import ListItem from '../../../components/list-item'

// Contexts
import { useSavedFilters } from '../contexts/saved-filters.context'

// Utils
import { highlighterColors } from '../../../utils/constants'
import { cn, getIconColor } from '../../../utils/helpers'

type FilterOption = {
  type: 'bookmark' | 'highlight'
  colorName: string
  color: string
}

export const filters: FilterOption[] = Object.entries(highlighterColors).map(
  ([key, value]) => ({
    type: key === 'bookmark' ? 'bookmark' : 'highlight',
    colorName: key,
    color: value.color,
  }),
)

export default function SavedFiltersSelectionScreen({
  dismissSavedFiltersSheet,
}: {
  dismissSavedFiltersSheet: () => void
}) {
  const colorScheme = useColorScheme()
  const savedFilterType = useSavedFilters((state) => state.type)
  const savedFilterColor = useSavedFilters((state) => state.color)
  const { setSavedFilter } = useSavedFilters((state) => state.actions)

  // Constants
  const iconColor = getIconColor(colorScheme)

  // Methods
  const handleSelectFilter = useCallback(
    ({ type, colorName }: Omit<FilterOption, 'color'>) => {
      if (savedFilterType === type && savedFilterColor === colorName) {
        setSavedFilter({ type: '', color: '' })
        dismissSavedFiltersSheet()
        return
      }

      if (type === 'bookmark' && savedFilterType === type) {
        setSavedFilter({ type: '', color: '' })
        dismissSavedFiltersSheet()
        return
      }

      setSavedFilter({
        type,
        color: type === 'bookmark' ? '' : colorName,
      })
      dismissSavedFiltersSheet()
    },
    [
      savedFilterColor,
      savedFilterType,
      setSavedFilter,
      dismissSavedFiltersSheet,
    ],
  )

  return (
    <FlatList
      data={filters}
      renderItem={({ item }) => (
        <ListItem
          onClick={() =>
            handleSelectFilter({ type: item.type, colorName: item.colorName })
          }
        >
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

            {savedFilterType === item.type &&
              savedFilterColor === item.colorName && (
                <CheckIcon size={20} color={iconColor} />
              )}

            {item.type === 'bookmark' && savedFilterType === 'bookmark' && (
              <CheckIcon size={20} color={iconColor} />
            )}
          </View>
        </ListItem>
      )}
      contentContainerClassName="pt-4 px-4 gap-3"
    />
  )
}
