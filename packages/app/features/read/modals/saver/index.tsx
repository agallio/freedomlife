import { Platform, useColorScheme, View } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import * as Burnt from 'burnt'

// Screen
import SaverScreenComponent from './screen'

// Contexts
import {
  generateTextToCopy,
  useReadPassageGeneralContext,
} from '../../contexts/read-passage.context'

// Types
import type { SaverScreenProps } from './types'

export default function SaverScreen({ dismissSaverSheet }: SaverScreenProps) {
  const colorScheme = useColorScheme()
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const { updateSelectedText } = useReadPassageGeneralContext(
    (state) => state.actions,
  )

  // Methods
  const handleCopyClick = async () => {
    if (Platform.OS !== 'web') {
      const textToCopy = generateTextToCopy(selectedText, selectedBibleVersion)

      await Clipboard.setStringAsync(textToCopy)
      dismissSaverSheet?.()
      updateSelectedText([])

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
    <View className="p-4">
      <SaverScreenComponent handleCopyClick={handleCopyClick} />
    </View>
  )
}
