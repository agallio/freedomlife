import { useMemo } from 'react'
import { Platform } from 'react-native'
import * as Burnt from 'burnt'

// Components
import ItemRightIcon from './item-right-icon'
import { ToasterWebComponent } from '../../../../../../components/toaster-container.web'

// Contexts
import { useReadModalsWebContext } from '../../../../contexts/read-modals.context.web'
import {
  generateTextToCopy,
  useReadPassageGeneralContext,
} from '../../../../contexts/read-passage.context'

export default function ReadNavbarRight() {
  const { setOpenSetting } = useReadModalsWebContext()
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const { updateSelectedText } = useReadPassageGeneralContext(
    (state) => state.actions,
  )

  // Memoized Values
  const isSelected = useMemo(() => selectedText.length > 0, [selectedText])

  // Methods
  const onSettingClick = () => {
    if (Platform.OS === 'web') {
      setOpenSetting(true)
    }
  }

  const onCopyClick = async () => {
    if (Platform.OS === 'web') {
      const textToCopy = generateTextToCopy(selectedText, selectedBibleVersion)

      try {
        await navigator.clipboard.writeText(textToCopy)
        updateSelectedText([])

        Burnt.toast({
          preset: 'done',
          duration: 1.5,
          // @ts-ignore: burnt typing issue
          title: <ToasterWebComponent title="Ayat Tersalin!" />,
        })
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  }

  return (
    <ItemRightIcon
      isSelected={isSelected}
      onCopyClick={onCopyClick}
      onSettingClick={onSettingClick}
    />
  )
}
