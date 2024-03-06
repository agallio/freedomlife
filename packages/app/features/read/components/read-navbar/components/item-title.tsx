import { Platform, View, useColorScheme } from 'react-native'
import { useRouter } from 'solito/router'
import { BookOpenIcon } from 'react-native-heroicons/solid'

// Components
import { Button } from '../../../../../components/button'
import { Text } from '../../../../../components/text'

// Contexts
import { useReadModalsContext } from '../../../contexts/read-modals.context'
import { useReadPassageContext } from '../../../contexts/read-passage.context'

// Utils
import { getIconColor } from '../../../../../utils/helpers'

type ReadNavbarTitleProps = {
  passageName: string
}

export default function ReadNavbarTitle({ passageName }: ReadNavbarTitleProps) {
  const colorScheme = useColorScheme()
  const { push } = useRouter()
  const { setOpenPassage } = useReadModalsContext()
  const { guided, highlightedText } = useReadPassageContext()

  // Constants
  const isHighlighted = highlightedText.length > 0
  const color = getIconColor(colorScheme)

  // Methods
  const onClick = () => {
    if (Platform.OS === 'web') {
      setOpenPassage(true)
      return
    }

    push('/passage')
  }

  if (isHighlighted) {
    return (
      <View className="h-[40px] justify-center">
        <Text customFontWeight="font-medium">
          {highlightedText.length} Ayat Terpilih
        </Text>
      </View>
    )
  }

  return (
    <View style={{ position: 'relative' }}>
      <Button
        variant="passage"
        text={passageName}
        onClick={onClick}
        disabled={passageName === 'Memuat' || passageName === 'Error'}
      />

      {/* 
        Need to do fully manual styling for the View (no tailwind).
        See the explanation in the parent component.
      */}
      {guided.enabled && (
        <View
          style={{
            position: 'absolute',
            right: -8,
            borderRadius: 9999,
            padding: 4,
            bottom: 0,
            backgroundColor:
              colorScheme === 'dark'
                ? 'rgb(16, 185, 129)'
                : 'rgb(52, 211, 153)',
          }}
        >
          <BookOpenIcon
            size={14}
            className={
              Platform.OS === 'web'
                ? 'text-emerald-900 dark:text-white'
                : undefined
            }
            color={Platform.OS !== 'web' ? color : undefined}
          />
        </View>
      )}
    </View>
  )
}
