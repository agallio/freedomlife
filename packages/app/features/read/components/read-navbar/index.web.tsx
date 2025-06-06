import { View } from 'react-native'

// Components
import NavbarWeb from '../../../../components/navbar.web'
import ReadNavbarContainer from './components/item-container'

// Contexts
import { useReadPassageGeneralContext } from '../../contexts/read-passage.context'

// Types
import type { ReadNavbarProps } from './types'

export default function ReadNavbar(props: ReadNavbarProps) {
  const highlightedText = useReadPassageGeneralContext(
    (state) => state.highlightedText,
  )

  // Constants
  const isHighlighted = highlightedText.length > 0

  return (
    <NavbarWeb active={isHighlighted}>
      <View className="relative w-full flex-row items-center justify-between">
        <ReadNavbarContainer {...props} />
      </View>
    </NavbarWeb>
  )
}
