// Components
import Drawer from '../../../../components/drawer'
import TranslateContainer from './translate-container'

// Contexts
import { useReadModalsWebContext } from '../../contexts/read-modals.context.web'

export default function TranslateModal() {
  const { openTranslate, setOpenTranslate } = useReadModalsWebContext()

  return (
    <Drawer
      open={openTranslate}
      title="Pilih Terjemahan"
      setOpen={setOpenTranslate}
    >
      <TranslateContainer handleBack={() => setOpenTranslate(false)} />
    </Drawer>
  )
}
