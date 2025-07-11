import { useMemo } from 'react'
import { Platform, View } from 'react-native'

// Components
import ItemRightIcon from './item-right-icon'

// Contexts
import { useReadModalsWebContext } from '../../../../contexts/read-modals.context.web'
import { useReadPassageGeneralContext } from '../../../../contexts/read-passage.context'

export default function ReadNavbarRight() {
  const { setOpenSetting } = useReadModalsWebContext()
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )

  // Memoized Values
  const isSelected = useMemo(() => selectedText.length > 0, [selectedText])

  // Methods
  const onSettingClick = () => {
    if (Platform.OS === 'web') {
      setOpenSetting(true)
    }
  }

  if (isSelected) return <View className="h-[28px] w-[28px]" />

  return <ItemRightIcon onSettingClick={onSettingClick} />
}
