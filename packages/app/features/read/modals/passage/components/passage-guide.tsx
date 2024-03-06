import { useMemo } from 'react'
import { Platform, View } from 'react-native'
import { useRouter } from 'solito/router'

// Components
import { Header, Text } from '../../../../../components/text'
import { Button } from '../../../../../components/button'
import Card from '../../../../../components/card'
import ListItem from '../../../../../components/list-item'

// Contexts
import { useReadModalsContext } from '../../../contexts/read-modals.context'
import { useReadPassageContext } from '../../../contexts/read-passage.context'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from '../../../../../hooks/use-guide-query'

// Utils
import { cn } from '../../../../../utils/helpers'

export default function PassageGuide() {
  const router = useRouter()
  const { setOpenPassage } = useReadModalsContext()
  const {
    guided,
    setGuidedEnable,
    setGuidedSelectedPassage,
    setSelectedBiblePassage,
  } = useReadPassageContext()

  // Queries
  const { data: guideTodayData } = useGuideTodayQuery()
  const { data: guideByDateData } = useGuideByDateQuery({
    date: guided.date,
    enabled: guided.enabled && guided.date !== '',
  })

  // Memoized Values
  const computedGuideData = useMemo(() => {
    if (guided.enabled && guided.date !== '') {
      return guideByDateData?.guide_bible_data || []
    }

    return guideTodayData?.guide_bible_data || []
  }, [guided.enabled, guided.date, guideTodayData, guideByDateData])

  // Methods
  const onPassageClick = (passage: string) => {
    setGuidedSelectedPassage(passage)

    if (Platform.OS === 'web') {
      setOpenPassage(false)
    } else {
      router.back()
    }
  }

  const onExitGuideClick = () => {
    const activeGuideData = computedGuideData.find(
      (guide) => guide.value === guided.selectedPassage,
    )

    if (activeGuideData) {
      setSelectedBiblePassage(activeGuideData.abbr)
      setGuidedEnable(false)

      if (Platform.OS === 'web') {
        setOpenPassage(false)
        router.push(`/read/bible?chapter=${activeGuideData.abbr}`)
      } else {
        router.back()
      }
    }
  }

  return (
    <View className="gap-4">
      <Card
        variant="active"
        footer={
          <View className="px-4 py-2">
            <Button
              fullWidth
              variant="card"
              ariaLabel="Tombol untuk keluar dari panduan baca"
              text="Keluar Dari Panduan Baca"
              className="web:hover:bg-emerald-800 web:dark:hover:bg-white/30 web:active:bg-emerald-800 web:dark:active:bg-white/30 bg-emerald-700 dark:bg-white/20"
              textClassName="text-white"
              onClick={onExitGuideClick}
            />
          </View>
        }
      >
        <View className="p-4">
          <Text className="leading-snug">
            Anda sedang membaca menggunakan panduan. Jika Anda ingin membaca
            pasal diluar panduan silakan tekan tombol keluar dibawah ini.
          </Text>
        </View>
      </Card>

      <View className="gap-2">
        {computedGuideData.map((guideData, index) => (
          <ListItem
            key={index}
            active={guideData.value === guided.selectedPassage}
            onClick={() => onPassageClick(guideData.value)}
          >
            <View>
              <Header
                aria-level={3}
                customFontWeight="font-semibold"
                customFontSize="text-lg"
                className="leading-snug"
              >
                {guideData.title}
              </Header>
              <Text
                customFontSize="text-sm"
                className={cn(
                  'mb-0.5',
                  guideData.value === guided.selectedPassage
                    ? 'text-emerald-800'
                    : 'text-emerald-900',
                )}
              >
                {guideData.subtitle}
              </Text>
            </View>
          </ListItem>
        ))}
      </View>
    </View>
  )
}
