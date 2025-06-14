import { Platform, View } from 'react-native'

// Components
import ItemRightIcon from './item-right-icon'

// Contexts
import { useReadModalsWebContext } from '../../../../contexts/read-modals.context.web'
import { useReadPassageGeneralContext } from '../../../../contexts/read-passage.context'

export default function ReadNavbarRight() {
  const { setOpenSetting } = useReadModalsWebContext()
  const highlightedText = useReadPassageGeneralContext(
    (state) => state.highlightedText,
  )

  // Constants
  const isHighlighted = highlightedText.length > 0

  // Methods
  const onSettingClick = () => {
    if (Platform.OS === 'web') {
      setOpenSetting(true)
    }
  }

  if (isHighlighted) return <View className="h-[28px] w-[28px]" />

  return <ItemRightIcon onSettingClick={onSettingClick} />
}
