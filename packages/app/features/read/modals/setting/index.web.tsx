// Screen
import SettingScreenComponent from './screen'

// Components
import Drawer from '../../../../components/drawer'

// Contexts
import { useReadModalsWebContext } from '../../contexts/read-modals.context.web'

export default function SettingScreen() {
  const { openSetting, setOpenSetting } = useReadModalsWebContext()

  return (
    <Drawer
      open={openSetting}
      size="small"
      title="Pengaturan"
      setOpen={setOpenSetting}
    >
      <SettingScreenComponent />
    </Drawer>
  )
}
