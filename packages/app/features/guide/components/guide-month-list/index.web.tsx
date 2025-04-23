import { View } from 'react-native'

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
  )
}
