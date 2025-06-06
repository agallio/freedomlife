import { Platform } from 'react-native'
import * as Burnt from 'burnt'
import { CheckCircleIcon } from 'react-native-heroicons/outline'

// Components
import ItemRightIcon from './item-right-icon'
import { ToasterWebComponent } from '../../../../../../components/toaster-container.web'

// Contexts
import { useReadModalsContext } from '../../../../contexts/read-modals.context'
import {
  generateTextToCopy,
  useReadPassageGeneralContext,
} from '../../../../contexts/read-passage.context'

// Types
import type { ReadNavbarRightProps } from '.'

export default function ReadNavbarRight({
  cleanPassageName,
}: ReadNavbarRightProps) {
  const { setOpenSetting } = useReadModalsContext()
  const highlightedText = useReadPassageGeneralContext(
    (state) => state.highlightedText,
  )
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const { updateHighlightedText } = useReadPassageGeneralContext(
    (state) => state.actions,
  )

  // Constants
  const isHighlighted = highlightedText.length > 0

  // Methods
  const onSettingClick = () => {
    if (Platform.OS === 'web') {
      setOpenSetting(true)
    }
  }

  const onCopyClick = async () => {
    if (Platform.OS === 'web') {
      const textToCopy = generateTextToCopy(
        highlightedText,
        selectedBibleVersion,
        cleanPassageName,
      )

      try {
        await navigator.clipboard.writeText(textToCopy)
        updateHighlightedText([])

        Burnt.toast({
          preset: 'done',
          duration: 1.5,
          // @ts-ignore: burnt typing issue
          title: (
            <ToasterWebComponent
              icon={
                <CheckCircleIcon
                  size={26}
                  className="text-emerald-900 dark:text-white"
                />
              }
              title="Ayat Tersalin!"
            />
          ),
        })
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
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
