// Screen
import SettingScreenComponent from './screen'

// Components
import Drawer from '../../../../components/drawer'

// Contexts
import { useReadModalsContext } from '../../contexts/read-modals.context'

export default function SettingScreen() {
  const { openSetting, setOpenSetting } = useReadModalsContext()

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
