import { useMemo } from 'react'
import { View } from 'react-native'

// Components
import NavbarWeb from '../../../../components/navbar.web'
import ReadNavbarContainer from './components/item-container'

// Contexts
import { useReadPassageGeneralContext } from '../../contexts/read-passage.context'

// Types
import type { ReadNavbarProps } from './types'

export default function ReadNavbar(props: ReadNavbarProps) {
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )

  // Memoized Values
  const isSelected = useMemo(() => selectedText.length > 0, [selectedText])

  return (
    <NavbarWeb active={isSelected}>
      <View className="relative w-full flex-row items-center justify-between">
        <ReadNavbarContainer {...props} />
      </View>
    </NavbarWeb>
  )
}
