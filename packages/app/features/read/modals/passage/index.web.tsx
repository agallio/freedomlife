import { ChevronLeftIcon } from 'react-native-heroicons/solid'

// Screens
import PassageScreenComponent from './screen'
import PassageChapterScreen from '../passage-chapter'

// Components
import { IconButton } from '../../../../components/button'
import Drawer from '../../../../components/drawer'
import PassageSearchInput from './components/passage-search-input'

// Contexts
import { useReadModalsContext } from '../../contexts/read-modals.context'
import { useReadPassageContext } from '../../contexts/read-passage.context'
import { useReadPassageChapterContext } from '../../contexts/read-passage-chapter.context'

export default function PassageScreen() {
  const {
    openPassage,
    openPassageChapter,
    setOpenPassage,
    setOpenPassageChapter,
  } = useReadModalsContext()
  const { guided } = useReadPassageContext()
  const { setSearchText } = useReadPassageChapterContext()

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
      backButton={openPassageChapter ? <PassageBackButton /> : undefined}
      searchInput={
        !guided.enabled ? (
          <PassageSearchInput disabled={openPassageChapter} />
        ) : undefined
      }
    >
      {openPassage && openPassageChapter ? (
        <PassageChapterScreen />
      ) : (
        <PassageScreenComponent />
      )}
    </Drawer>
  )
}

function PassageBackButton() {
  const { setOpenPassageChapter } = useReadModalsContext()
  const { setDialogSelectedPassage } = useReadPassageChapterContext()

  return (
    <IconButton
      ariaLabel="Tombol untuk menutup dialog"
      size="sm"
      icon={<ChevronLeftIcon size={20} className="dark:text-white" />}
      onClick={() => {
        setOpenPassageChapter(false)
        setDialogSelectedPassage('')
      }}
    />
  )
}
