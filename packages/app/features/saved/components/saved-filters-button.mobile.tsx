import { useMemo } from 'react'
import { useColorScheme, View } from 'react-native'
import { FunnelIcon as FunnelIconSolid } from 'react-native-heroicons/solid'
import { FunnelIcon as FunnelIconOutline } from 'react-native-heroicons/outline'

// Components
import ListItem from '../../../components/list-item'
import { Text } from '../../../components/text'

// Contexts
import { useSavedFiltersSheetActionsMobileContext } from '../../../providers/bottom-sheet/saved-filters-bottom-sheet/saved-filters-bottom-sheet.mobile'
import { useSavedFilters } from '../contexts/saved-filters.context'

// Utils
import { getIconColor } from '../../../utils/helpers'

export default function SavedFiltersButton() {
  const colorScheme = useColorScheme()
  const savedFilterType = useSavedFilters((state) => state.type)
  const savedFilterColor = useSavedFilters((state) => state.color)
  const { showSavedFiltersSheet } = useSavedFiltersSheetActionsMobileContext()

  // Constants
  const iconColor = getIconColor(colorScheme)

  // Memoized Values
  const isFilterActive = useMemo(() => {
    return savedFilterType !== '' || savedFilterColor !== ''
  }, [savedFilterType, savedFilterColor])

  const savedFilterTypeText = useMemo(() => {
    if (savedFilterType === 'bookmark') {
      return 'Marka Buku'
    }

    if (savedFilterType === 'highlight') {
      return 'Warna'
    }

    return ''
  }, [savedFilterType])

  return (
    <ListItem onClick={showSavedFiltersSheet}>
      <View className="w-full flex-row items-center justify-between">
        <Text>
          {isFilterActive
            ? `Filter Aktif (${savedFilterTypeText})`
            : 'Pilih Filter'}
        </Text>
        {isFilterActive ? (
          <FunnelIconSolid size={18} color={iconColor} />
        ) : (
          <FunnelIconOutline size={18} color={iconColor} />
        )}
      </View>
    </ListItem>
  )
}
