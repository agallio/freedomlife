import { useMemo } from 'react'
import { Platform, useColorScheme, View } from 'react-native'
import { LanguageIcon, XMarkIcon } from 'react-native-heroicons/solid'

// Components
import { IconButton } from '../../../../../components/button'

// Contexts
import { useReadModalsWebContext } from '../../../contexts/read-modals.context.web'
import { useReadPassageGeneralContext } from '../../../contexts/read-passage.context'

// Utils
import { getIconColor } from '../../../../../utils/helpers'
import { isSunsetActive } from '../../../../../utils/constants'

type ReadNavbarLeftProps = {
  isLoading: boolean
  redirectToTranslateScreen: () => void
}

export default function ReadNavbarLeft({
  isLoading,
  redirectToTranslateScreen,
}: ReadNavbarLeftProps) {
  const colorScheme = useColorScheme()
  const { setOpenSaver, setOpenTranslate } = useReadModalsWebContext()
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )
  const { updateSelectedText } = useReadPassageGeneralContext(
    (state) => state.actions,
  )

  // Constants
  const color = getIconColor(colorScheme)
  const sunsetActive = isSunsetActive()

  // Memoized Values
  const isSelected = useMemo(() => selectedText.length > 0, [selectedText])

  // Methods
  const onTranslateClick = () => {
    if (Platform.OS === 'web') {
      setOpenTranslate(true)
      return
    }

    redirectToTranslateScreen()
  }

  const onResetHighlightClick = () => {
    if (Platform.OS === 'web') {
      setOpenSaver(false)
    }

    updateSelectedText([])
  }

  if (isSelected) {
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

  if (sunsetActive) {
    return <View className="h-[28px] w-[28px]" />
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
      disabled={isLoading}
      onClick={onTranslateClick}
    />
  )
}
