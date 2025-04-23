import { FlatList } from 'react-native'

// Components
import GuideMonthItem from '../guide-month-item'

// Utils
import dayjs from '../../../../utils/dayjs'

// Types
import type { GuideMonthListProps } from './types'

export default function GuideMonthList({
  selectedGuideMonth,
  onMonthClick,
}: GuideMonthListProps) {
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
