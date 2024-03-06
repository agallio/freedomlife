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
  useReadPassageContext,
} from '../../../../contexts/read-passage.context'

// Types
import type { ReadNavbarRightProps } from '.'

export default function ReadNavbarRight({
  cleanPassageName,
}: ReadNavbarRightProps) {
  const { setOpenSetting } = useReadModalsContext()
  const { highlightedText, selectedBibleVersion, updateHighlightedText } =
    useReadPassageContext()

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
          // @ts-ignore
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
