import { Platform, useColorScheme } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import * as Burnt from 'burnt'

// Components
import ItemRightIcon from './item-right-icon'

// Contexts
import {
  generateTextToCopy,
  useReadPassageContext,
} from '../../../../contexts/read-passage.context'
import { useSettingSheetContext } from '../../../../../../providers/bottom-sheet/setting-bottom-sheet.mobile'

export type ReadNavbarRightProps = {
  cleanPassageName: string
}

// Needs to separate native and web since expo-clipboard crash on web.
export default function ReadNavbarRight({
  cleanPassageName,
}: ReadNavbarRightProps) {
  const colorScheme = useColorScheme()
  const { highlightedText, selectedBibleVersion, updateHighlightedText } =
    useReadPassageContext()
  const { showSheet } = useSettingSheetContext()

  // Constants
  const isHighlighted = highlightedText.length > 0

  // Methods
  const onSettingClick = () => {
    if (Platform.OS !== 'web') {
      showSheet()
    }
  }

  const onCopyClick = async () => {
    if (Platform.OS !== 'web') {
      const textToCopy = generateTextToCopy(
        highlightedText,
        selectedBibleVersion,
        cleanPassageName,
      )
      await Clipboard.setStringAsync(textToCopy)
      updateHighlightedText([])

      Burnt.toast({
        preset: 'custom',
        title: 'Ayat Tersalin!',
        duration: 1.5,
        icon: {
          ios: {
            name: 'checkmark.circle',
            color: colorScheme === 'light' ? '#047857' : '#6ee7b7',
          },
        },
      })
    }
  }

  return (
    <ItemRightIcon
      isHighlighted={isHighlighted}
      onCopyClick={onCopyClick}
      onSettingClick={onSettingClick}
    />
  )
}
