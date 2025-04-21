import { View } from 'react-native'

// Components
import GuideErrorCard from '../guide-error-card'
import GuideCard from '../guide-card'

// Utils
import dayjs from '../../../../utils/dayjs'

// Types
import type { GuideListProps } from './types'

export default function GuideList({
  queryData,
  getGuideHasBeenRead,
  onGuideClick,
  onCheckMarkClick,
}: GuideListProps) {
  const { data, isLoading, isError } = queryData

  return (
    <View className="mt-4 gap-4">
      {isError ? (
        <GuideErrorCard />
      ) : isLoading ? (
        [...Array(3).keys()].map((_, i) => <GuideCard key={i} isLoading />)
      ) : (
        data!.map((item, index) => (
          <GuideCard
            key={index}
            item={item}
            isActive={item.date === dayjs().format('DD-MM-YYYY')}
            isRead={getGuideHasBeenRead(item.date!)}
            onGuideClick={onGuideClick}
            onCheckMarkClick={onCheckMarkClick}
          />
        ))
      )}
    </View>
  )
}
