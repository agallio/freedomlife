// Components
import Drawer from '../../../../components/drawer'
import TranslateContainer from './translate-container'

// Contexts
import { useReadModalsContext } from '../../contexts/read-modals.context'

export default function TranslateModal() {
  const { openTranslate, setOpenTranslate } = useReadModalsContext()

  return (
    <Drawer
      open={openTranslate}
      title="Pilih Terjemahan"
      setOpen={setOpenTranslate}
    >
      <TranslateContainer />
    </Drawer>
  )
}
