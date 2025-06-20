import { useColorScheme, View } from 'react-native'
import { FunnelIcon } from 'react-native-heroicons/solid'

// Components
import ListItem from '../../../components/list-item'
import { Text } from '../../../components/text'

// Contexts
import { useSavedFiltersSheetActionsMobileContext } from '../../../providers/bottom-sheet/saved-filters-bottom-sheet/saved-filters-bottom-sheet.mobile'

// Utils
import { getIconColor } from '../../../utils/helpers'

export default function SavedFiltersButton() {
  const colorScheme = useColorScheme()
  const { showSavedFiltersSheet } = useSavedFiltersSheetActionsMobileContext()

  const iconColor = getIconColor(colorScheme)

  return (
    <ListItem onClick={showSavedFiltersSheet}>
      <View className="w-full flex-row items-center justify-between">
        <Text>Pilih Filter</Text>
        <FunnelIcon size={18} color={iconColor} />
      </View>
    </ListItem>
  )
}
