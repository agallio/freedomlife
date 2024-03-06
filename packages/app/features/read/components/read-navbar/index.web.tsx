import { View } from 'react-native'

// Components
import NavbarWeb from '../../../../components/navbar.web'
import ReadNavbarContainer from './components/item-container'

// Contexts
import { useReadPassageContext } from '../../contexts/read-passage.context'

export default function ReadNavbar() {
  const { highlightedText } = useReadPassageContext()

  // Constants
  const isHighlighted = highlightedText.length > 0

  return (
    <NavbarWeb active={isHighlighted}>
      <View className="relative w-full flex-row items-center justify-between">
        <ReadNavbarContainer />
      </View>
    </NavbarWeb>
  )
}
