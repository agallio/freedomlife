import { useEffect, useRef } from 'react'
import { FlatList, View } from 'react-native'

// Components
import GuideErrorCard from '../guide-error-card'
import GuideCard from '../guide-card'

// Utils
import dayjs from '../../../../utils/dayjs'

// Types
import type { GuideListProps } from './types'

export default function GuideList({
  queryData,
  mobileSelectedGuideMonth,
  getGuideHasBeenRead,
  onGuideClick,
  onCheckMarkClick,
}: GuideListProps) {
  const { data, isLoading, isError } = queryData

  // Refs
  const flatListRef = useRef<FlatList>()

  // Methods
  const scrollToTop = () => {
    flatListRef.current!.scrollToIndex({
      index: 0,
      viewOffset: 20,
    })
  }

  // Effects
  useEffect(() => {
    // Wait until the flatListRef is ready then,
    // trigger scrollToTop right after the `guideMonth` changes.
    if (flatListRef.current) {
      scrollToTop()
    }
  }, [mobileSelectedGuideMonth])

  if (isLoading) {
    return (
      <View className="gap-4 px-6 pb-28 pt-4 min-[744px]:px-40 md:px-52 lg:px-96">
        {[...Array(3).keys()].map((_, i) => (
          <GuideCard key={i} isLoading />
        ))}
      </View>
    )
  }

  if (isError) {
    return (
      <View className="gap-4 px-6 pt-4 min-[744px]:px-40 md:px-52 lg:px-96">
        <GuideErrorCard />
      </View>
    )
  }

  return (
    <FlatList
      ref={flatListRef as any}
      data={data}
      keyExtractor={(_, index) => `item-${index}`}
      scrollEventThrottle={16}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={4}
      renderItem={({ item }) => (
        <GuideCard
          item={item}
          isActive={item.date === dayjs().format('DD-MM-YYYY')}
          isRead={getGuideHasBeenRead(item.date!)}
          onGuideClick={onGuideClick}
          onCheckMarkClick={onCheckMarkClick}
        />
      )}
      contentContainerClassName="pt-4 px-6 pb-28 gap-4 min-[744px]:px-40 md:px-52 lg:px-96"
    />
  )
}
