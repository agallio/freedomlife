import { Platform, useColorScheme } from 'react-native'
import { useRouter } from 'solito/router'
import { LanguageIcon, XMarkIcon } from 'react-native-heroicons/solid'

// Components
import { IconButton } from '../../../../../components/button'

// Contexts
import { useReadModalsContext } from '../../../contexts/read-modals.context'
import { useReadPassageContext } from '../../../contexts/read-passage.context'

// Utils
import { getIconColor } from '../../../../../utils/helpers'

export default function ReadNavbarLeft() {
  const colorScheme = useColorScheme()
  const { push } = useRouter()
  const { setOpenTranslate } = useReadModalsContext()
  const { highlightedText, updateHighlightedText } = useReadPassageContext()

  // Constants
  const isHighlighted = highlightedText.length > 0
  const color = getIconColor(colorScheme)

  // Methods
  const onTranslateClick = () => {
    if (Platform.OS === 'web') {
      setOpenTranslate(true)
      return
    }

    push('/translate')
  }

  const onResetHighlightClick = () => {
    updateHighlightedText([])
  }

  if (isHighlighted) {
    return (
      <IconButton
        ariaLabel="Tombol untuk menghapus sorotan"
        variant="transparent"
        icon={
          <XMarkIcon
            size={26}
            className={
              Platform.OS === 'web'
                ? 'text-emerald-900 transition duration-200 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-500'
                : undefined
            }
            color={Platform.OS !== 'web' ? color : undefined}
          />
        }
        onClick={onResetHighlightClick}
      />
    )
  }

  return (
    <IconButton
      ariaLabel="Tombol untuk memilih terjemahan"
      variant="transparent"
      icon={
        <LanguageIcon
          size={26}
          className={
            Platform.OS === 'web'
              ? 'text-emerald-900 transition duration-200 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-500'
              : undefined
          }
          color={Platform.OS !== 'web' ? color : undefined}
        />
      }
      onClick={onTranslateClick}
    />
  )
}
