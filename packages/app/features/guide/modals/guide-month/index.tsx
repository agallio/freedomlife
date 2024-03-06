import { FlatList, Platform } from 'react-native'
import { useRouter } from 'solito/router'

// Components
import GuideMonthItem from './components/guide-month-item'

// Contexts
import { useReadPassageContext } from '../../../read/contexts/read-passage.context'

// Utils
import dayjs from '../../../../utils/dayjs'

export default function GuideMonthScreenComponent() {
  const router = useRouter()
  const { selectedGuideMonth, setSelectedGuideMonth } = useReadPassageContext()

  // Methods
  const onMonthClick = (monthString: string) => {
    setSelectedGuideMonth(monthString)

    if (Platform.OS !== 'web') {
      router.replace('/guide')
    }
  }

  return (
    <FlatList
      data={[...Array(12).keys()] as any}
      keyExtractor={(_, index) => `item-${index}`}
      scrollEventThrottle={16}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={4}
      renderItem={({ item }) => (
        <GuideMonthItem
          active={Number(selectedGuideMonth) === item + 1}
          monthNumber={item}
          disabled={item + 1 > Number(dayjs().format('MM'))}
          onClick={onMonthClick}
        />
      )}
      contentContainerClassName="pt-4 px-4 pb-16 gap-3"
    />
  )
}
