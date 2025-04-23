import { useCallback, useState } from 'react'
import { Platform, useColorScheme, View } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Burnt from 'burnt'

// Components
import GuideMonthButton from '@repo/app/features/guide/components/guide-month-button'
import GuideList from '@repo/app/features/guide/components/guide-list'

// Contexts
import { useReadPassageContext } from '@repo/app/features/read/contexts/read-passage.context'

// Queries
import { useGuideByMonthQuery } from '@repo/app/hooks/use-guide-query'

// Utils
import dayjs from '@repo/app/utils/dayjs'

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
  const queryData = useGuideByMonthQuery(selectedGuideMonth)

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
      duration: 1.5,
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

  const redirectToGuideMonthScreen = () => {
    router.push('/guide-month')
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
      <View className="border-b border-[#e6e6e6] px-6 pb-4 pt-2 min-[744px]:px-40 md:px-52 lg:px-96 dark:border-[#374151]">
        <GuideMonthButton
          redirectToGuideMonthScreen={redirectToGuideMonthScreen}
        />
      </View>

      <GuideList
        queryData={queryData}
        getGuideHasBeenRead={getGuideHasBeenRead}
        onGuideClick={onGuideClick}
        onCheckMarkClick={onCheckMarkClick}
      />
    </>
  )
}
