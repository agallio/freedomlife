import { useCallback, useState } from 'react'
import { FlatList, Platform, View, useColorScheme } from 'react-native'
import { useFocusEffect } from 'expo-router'
import { useRouter } from 'solito/router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Burnt from 'burnt'

// Components
import GuideMonthButton from './components/guide-month-button'
import GuideCard from './components/guide-card'
import GuideErrorCard from './components/guide-error-card'

// Contexts
import { useReadPassageContext } from '../read/contexts/read-passage.context'

// Queries
import { useGuideByMonthQuery } from '../../hooks/use-guide-query'

// Utils
import dayjs from '../../utils/dayjs'

export default function GuideScreen() {
  const colorScheme = useColorScheme()
  const router = useRouter()
  const {
    selectedGuideMonth,
    setGuidedEnable,
    setGuidedDate,
    setGuidedSelectedPassage,
    setSelectedBibleVersion,
  } = useReadPassageContext()

  // States
  const [guidesHaveBeenRead, setGuidesHaveBeenRead] = useState<string[]>([])

  // Queries
  const { data, isLoading, isError } = useGuideByMonthQuery(selectedGuideMonth)

  // Methods
  const onGuideClick = (date: string) => {
    setGuidedEnable(true)
    setGuidedDate(date)
    setGuidedSelectedPassage('pl-1')
    setSelectedBibleVersion('tb')
    router.push('/read')
  }

  const onCheckMarkClick = (date: string) => {
    const title = 'Panduan Telah Dibaca'
    const message = dayjs(date, 'DD-MM-YYYY').format('DD MMMM YYYY')

    Burnt.toast({
      preset: 'custom',
      title: Platform.OS === 'ios' ? title : `${title}\n${message}`,
      message: Platform.OS === 'ios' ? message : '',
      icon: {
        ios: {
          name: 'checkmark.circle',
          color: colorScheme === 'light' ? '#047857' : '#6ee7b7',
        },
      },
    })
  }

  const getGuideHasBeenRead = (date: string) => {
    return guidesHaveBeenRead.includes(`read-${date}`)
  }

  // Focus Effects (Native)
  useFocusEffect(
    useCallback(() => {
      const getAllStorageKeys = async () => {
        // Get all storage keys that has `read-` prefix then store it to state.
        // e.g. `read-01-01-2024`.
        const allStorageKeys = await AsyncStorage.getAllKeys()
        const allReadKeys = allStorageKeys.filter((i) => /^read\W/gm.test(i))
        setGuidesHaveBeenRead(allReadKeys)
      }

      getAllStorageKeys()
    }, []),
  )

  return (
    <>
      <View className="border-b border-[#e6e6e6] px-6 pb-4 pt-2 md:px-52 lg:px-96 dark:border-[#374151]">
        <GuideMonthButton />
      </View>

      {isError ? (
        <View className="gap-4 px-6 pt-4 md:px-52 lg:px-96">
          <GuideErrorCard />
        </View>
      ) : isLoading ? (
        <View className="gap-4 px-6 pb-28 pt-4 md:px-52 lg:px-96">
          {[...Array(3).keys()].map((_, i) => (
            <GuideCard key={i} isLoading />
          ))}
        </View>
      ) : (
        <FlatList
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
          contentContainerClassName="pt-4 px-6 pb-28 gap-4 md:px-52 lg:px-96"
        />
      )}
    </>
  )
}
