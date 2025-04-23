import { View, useColorScheme } from 'react-native'

// Components
import ReadNavbarContainer from './components/item-container'

// Contexts
import { useReadPassageContext } from '../../contexts/read-passage.context'

// Utils
import { useSafeArea } from '../../../../utils/hooks/use-safe-area'
import { cn } from '../../../../utils/helpers'

// Types
import type { ReadNavbarProps } from './types'

export default function ReadNavbar(props: ReadNavbarProps) {
  const { top } = useSafeArea()
  const colorScheme = useColorScheme()
  const { highlightedText } = useReadPassageContext()

  // Constants
  const isHighlighted = highlightedText.length > 0

  return (
    <>
      {/* 
        Some styles need to be applied manually using `style` prop.
        This component is rendered inside react-navigation (which is native).
        Because of that, some nativewind classnames is not applied (even though it's generated.)
      */}
      <View
        className={cn(
          'w-full flex-row items-end justify-between border-b px-6 sm:px-10',
          isHighlighted ? 'bg-emerald-300 dark:bg-emerald-700' : undefined,
        )}
        style={{
          height: top + 50,
          paddingBottom: 8,
          borderBottomColor:
            colorScheme === 'light'
              ? isHighlighted
                ? '#34d399'
                : '#e6e6e6'
              : isHighlighted
                ? '#065f46'
                : '#374151',
        }}
      >
        <View className="w-full flex-row items-center justify-between">
          <ReadNavbarContainer {...props} />
        </View>
      </View>
    </>
  )
}
