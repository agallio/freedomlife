/** Unused -- saved for later */
import { Platform } from 'react-native'
import { CheckCircleIcon } from 'react-native-heroicons/solid'
import * as Burnt from 'burnt'

// Screen
import SaverScreenComponent from './screen'

// Components
import MobileDrawer from '../../../../components/drawer/mobile'
import { ToasterWebComponent } from '../../../../components/toaster-container.web'

// Contexts
import { useReadModalsWebContext } from '../../contexts/read-modals.context.web'
import {
  generateTextToCopy,
  useReadPassageGeneralContext,
} from '../../contexts/read-passage.context'

export default function SaverScreen() {
  const { openSaver, setOpenSaver } = useReadModalsWebContext()
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
  const handleBack = (open: boolean) => {
    if (!open) {
      updateSelectedText([])
    }
    setOpenSaver(open)
  }

  const handleCopyClick = async () => {
    if (Platform.OS === 'web') {
      const textToCopy = generateTextToCopy(selectedText, selectedBibleVersion)

      try {
        await navigator.clipboard.writeText(textToCopy)
        updateSelectedText([])
        setOpenSaver(false)

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
    <MobileDrawer
      isModal={false}
      open={openSaver}
      dismissible={false}
      size="saver"
      title="Simpan & Bagikan"
      setOpen={handleBack}
      maxWidth="small"
    >
      <SaverScreenComponent handleCopyClick={handleCopyClick} />
    </MobileDrawer>
  )
}
