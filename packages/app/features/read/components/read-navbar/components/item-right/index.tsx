import { useMemo } from 'react'
import { Platform, View } from 'react-native'

// Components
import ItemRightIcon from './item-right-icon'

// Contexts
import { useReadPassageGeneralContext } from '../../../../contexts/read-passage.context'
import { useSettingSheetMobileContext } from '../../../../../../providers/bottom-sheet/setting-bottom-sheet.mobile'

// Needs to separate native and web since expo-clipboard crash on web.
export default function ReadNavbarRight() {
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )
  const { showSheet } = useSettingSheetMobileContext()

  // Memoized Values
  const isSelected = useMemo(() => selectedText.length > 0, [selectedText])

  // Methods
  const onSettingClick = () => {
    if (Platform.OS !== 'web') {
      showSheet()
    }
  }

  if (isSelected) return <View className="h-[28px] w-[28px]" />

  return <ItemRightIcon onSettingClick={onSettingClick} />
}
