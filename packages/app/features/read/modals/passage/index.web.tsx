import { MotiView } from 'moti'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'

// Components
import { IconButton } from '../../../../components/button'
import Drawer from '../../../../components/drawer'
import PassageChapter from './passage-chapter'
import PassageGuide from './passage-guide'
import PassageBible from './passage-bible'
import PassageSearchInput from './passage-bible/components/passage-search-input'

// Contexts
import { useReadModalsContext } from '../../contexts/read-modals.context'
import { useReadPassageContext } from '../../contexts/read-passage.context'
import { useReadPassageChapterContext } from '../../contexts/read-passage-chapter.context'

// Types
import type { PassageModalProps } from './types'

export default function PassageModal(props: PassageModalProps) {
  const {
    openPassage,
    openPassageChapter,
    setOpenPassage,
    setOpenPassageChapter,
  } = useReadModalsContext()
  const { guided } = useReadPassageContext()
  const { setSearchText, setDialogSelectedPassage } =
    useReadPassageChapterContext()

  return (
    <Drawer
      fixedHeight
      open={openPassage}
      setOpen={(open) => {
        setOpenPassage(open)
        if (!open) {
          setSearchText('')
          setOpenPassageChapter(false)
        }
      }}
      dismissible={openPassage && !openPassageChapter}
      title={guided.enabled ? 'Pilih Panduan Baca' : 'Pilih Kitab & Pasal'}
      backButton={
        openPassageChapter ? (
          <IconButton
            ariaLabel="Tombol untuk menutup dialog"
            size="sm"
            icon={<ChevronLeftIcon size={20} className="dark:text-white" />}
            onClick={() => {
              setOpenPassageChapter(false)
              setDialogSelectedPassage('')
            }}
          />
        ) : undefined
      }
      searchInput={
        !guided.enabled ? (
          <PassageSearchInput disabled={openPassageChapter} />
        ) : undefined
      }
    >
      {openPassage && openPassageChapter ? (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 200 }}
        >
          <PassageChapter
            handlePassageChapterBack={props.handlePassageChapterBack}
          />
        </MotiView>
      ) : (
        <PassageContainer {...props} guided={guided.enabled} />
      )}
    </Drawer>
  )
}

function PassageContainer({
  guided,
  handlePassageBack,
  redirectToPassageChapterScreen,
}: PassageModalProps & { guided: boolean }) {
  if (guided) {
    return <PassageGuide handlePassageBack={handlePassageBack} />
  }

  return (
    <PassageBible
      redirectToPassageChapterScreen={redirectToPassageChapterScreen}
    />
  )
}
