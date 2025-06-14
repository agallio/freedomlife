import { Platform, View } from 'react-native'

// Components
import ItemRightIcon from './item-right-icon'

// Contexts
import { useReadPassageGeneralContext } from '../../../../contexts/read-passage.context'
import { useSettingSheetMobileContext } from '../../../../../../providers/bottom-sheet/setting-bottom-sheet.mobile'

// Needs to separate native and web since expo-clipboard crash on web.
export default function ReadNavbarRight() {
  const highlightedText = useReadPassageGeneralContext(
    (state) => state.highlightedText,
  )
  const { showSheet } = useSettingSheetMobileContext()

  // Constants
  const isHighlighted = highlightedText.length > 0

  // Methods
  const onSettingClick = () => {
    if (Platform.OS !== 'web') {
      showSheet()
    }
  }

  if (isHighlighted) return <View className="h-[28px] w-[28px]" />

  return <ItemRightIcon onSettingClick={onSettingClick} />
}
