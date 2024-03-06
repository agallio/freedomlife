// Components
import { View } from 'react-native'
import Drawer from '../../../../components/drawer'
import TranslateContainer from './components/translate-container'

// Contexts
import { useReadModalsContext } from '../../contexts/read-modals.context'

// Utils
import { bibleTranslations } from '../../../../utils/constants'

export default function TranslateScreen() {
  const { openTranslate, setOpenTranslate } = useReadModalsContext()

  return (
    <Drawer
      open={openTranslate}
      title="Pilih Terjemahan"
      setOpen={setOpenTranslate}
    >
      <View className="gap-4">
        {bibleTranslations.map((item) => (
          <TranslateContainer
            key={item.language}
            language={item.language}
            versions={item.versions}
          />
        ))}
      </View>
    </Drawer>
  )
}
