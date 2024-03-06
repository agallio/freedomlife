import { Platform, View } from 'react-native'

// Components
import Drawer from '../../../../components/drawer'
import GuideMonthItem from './components/guide-month-item'

// Contexts
import { useGuideModalsContext } from '../../contexts/guide-modals.context'
import { useReadPassageContext } from '../../../read/contexts/read-passage.context'

// Utils
import dayjs from '../../../../utils/dayjs'

export default function GuideMonthScreen() {
  const { openGuideMonth, setOpenGuideMonth } = useGuideModalsContext()
  const { selectedGuideMonth, setSelectedGuideMonth } = useReadPassageContext()

  const onMonthClick = (monthString: string) => {
    setSelectedGuideMonth(monthString)

    if (Platform.OS === 'web') {
      setOpenGuideMonth(false)
    }
  }

  return (
    <Drawer
      open={openGuideMonth}
      title="Pilih Bulan Panduan"
      setOpen={setOpenGuideMonth}
    >
      <View className="gap-3">
        {[...Array(12).keys()].map((i) => (
          <GuideMonthItem
            key={i}
            active={Number(selectedGuideMonth) === i + 1}
            monthNumber={i}
            disabled={i + 1 > Number(dayjs().format('MM'))}
            onClick={onMonthClick}
          />
        ))}
      </View>
    </Drawer>
  )
}
