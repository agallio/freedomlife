import { useMemo } from 'react'
import {
  ListRenderItemInfo,
  Platform,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native'
import { useSx, View, Text, P } from 'dripsy'
import { useRouter } from 'solito/router'
import { Skeleton } from 'moti/skeleton'

// Contexts
import { useReadPassageContext } from '../../contexts/ReadPassageContext'

// Utils
import dayjs from 'app/utils/dayjs'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from 'app/utils/hooks/useGuideQuery'

// Types
import type { PassageScreenProps } from './PassageScreen'

interface GuidePassageItem {
  type: string
  title: string
  subtitle: string
  abbr: string
  value: string
}

export default function InGuide({ onSelectGuidePress }: PassageScreenProps) {
  const sx = useSx()
  const colorScheme = useColorScheme()
  const { back } = useRouter()

  // Contexts
  const {
    inGuide,
    guidePassage,
    guideDate,
    setPassage,
    setInGuide,
    setGuideDate,
    setGuidePassage,
  } = useReadPassageContext()

  // Queries
  const { data: guideTodayData, isLoading: guideTodayLoading } =
    useGuideTodayQuery()
  const { data: guideByDateData, isLoading: guideByDateLoading } =
    useGuideByDateQuery({
      date: guideDate,
      enabled: inGuide && guideDate !== '',
    })

  // Memoized Variables
  const guideList = useMemo(() => {
    const header = {
      type: 'disclaimer',
      abbr: '',
      title: guideDate
        ? dayjs(guideDate, 'DD-MM-YYYY').format('DD MMMM YYYY')
        : dayjs().format('DD MMMM YYYY'),
      subtitle:
        'Anda sedang membaca menggunakan panduan. Jika Anda ingin membaca\n pasal diluar panduan silakan tekan tombol keluar dibawah ini.',
      value: '',
    }

    if (!guideDate) {
      if (guideTodayData) {
        return [
          header,
          ...guideTodayData.guide_bible_data!.map((item) => ({
            ...item,
            type: 'passage',
          })),
        ]
      }
    }

    if (guideByDateData) {
      return [
        header,
        ...guideByDateData.guide_bible_data!.map((item) => ({
          ...item,
          type: 'passage',
        })),
      ]
    }

    return []
  }, [guideDate, guideTodayData, guideByDateData])

  // Methods
  const onPress = (value?: string) => {
    if (!value) {
      setGuideDate('')
      setInGuide(false)
      setPassage(
        guideList?.find((item) => item.value === guidePassage)?.abbr || 'kej-1'
      )
    }

    setGuidePassage(value || '')

    if (typeof onSelectGuidePress === 'function') {
      onSelectGuidePress()
    } else {
      back()
    }
  }

  return (
    <FlatList
      data={guideList}
      style={{ flex: 1 }}
      scrollEventThrottle={16}
      contentContainerStyle={sx({
        paddingTop: 14,
        paddingBottom: 60,
        paddingX: ['md', '2xl'],
      })}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item, index }: ListRenderItemInfo<GuidePassageItem>) => {
        if (item.type === 'disclaimer') {
          return (
            <View
              sx={{
                backgroundColor: 'tab',
                borderRadius: 8,
                boxShadow: 'container',
              }}
            >
              <Text
                sx={{
                  textAlign: 'center',
                  paddingY: 12,
                  fontWeight: '800',
                  color: 'text',
                }}
                // @ts-ignore
                // https://github.com/nandorojo/dripsy/issues/206
                style={
                  Platform.OS === 'web' ? { fontWeight: '600' } : undefined
                }
              >
                {item.title}
              </Text>
              <View
                sx={{
                  backgroundColor: 'inGuideCard',
                  paddingY: 12,
                  paddingX: 'md',
                  borderTopWidth: colorScheme === 'light' ? 1 : undefined,
                  borderBottomWidth: colorScheme === 'light' ? 1 : undefined,
                  borderTopColor:
                    colorScheme === 'light' ? '#e6e6e6' : undefined,
                  borderBottomColor:
                    colorScheme === 'light' ? '#e6e6e6' : undefined,
                }}
              >
                <P sx={{ lineHeight: 22, textAlign: 'center' }}>
                  {item.subtitle}
                </P>
              </View>

              <View sx={{ paddingX: 'md', paddingY: 12 }}>
                <TouchableOpacity
                  style={sx({
                    backgroundColor: 'inGuideCardButton',
                    py: 8,
                    borderRadius: 9999,
                    boxShadow: 'container',
                  })}
                  onPress={() => onPress()}
                >
                  <P
                    sx={{
                      textAlign: 'center',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                    }}
                    // @ts-ignore
                    // https://github.com/nandorojo/dripsy/issues/206
                    style={
                      Platform.OS === 'web' ? { fontWeight: '600' } : undefined
                    }
                  >
                    Keluar Dari Panduan Baca
                  </P>
                </TouchableOpacity>
              </View>
            </View>
          )
        }

        return (
          <TouchableOpacity
            style={sx({
              padding: 'md',
              backgroundColor:
                item.value === guidePassage ? 'tabActive' : 'tab',
              borderRadius: 8,
              boxShadow: 'container',
              marginTop: index !== 0 ? 'md' : undefined,
            })}
            onPress={() => onPress(item.value)}
          >
            <Skeleton
              show={guideDate ? guideByDateLoading : guideTodayLoading}
              width="70%"
              colors={
                item.value === guidePassage
                  ? colorScheme === 'dark'
                    ? ['#065f46', '#0aab7e']
                    : ['#34d399', '#10b981']
                  : colorScheme === 'dark'
                  ? ['#3d516d', '#1f2937']
                  : ['#d1d5db', '#e7eaed']
              }
            >
              <Text
                sx={{
                  fontWeight: '600',
                  fontSize: 'lg',
                  marginBottom: 'xs',
                  color: 'text',
                }}
                // @ts-ignore
                // https://github.com/nandorojo/dripsy/issues/206
                style={
                  Platform.OS === 'web' ? { fontWeight: '600' } : undefined
                }
              >
                {item.title}
              </Text>
            </Skeleton>
            <Skeleton
              show={guideDate ? guideByDateLoading : guideTodayLoading}
              width="50%"
              colors={
                item.value === guidePassage
                  ? colorScheme === 'dark'
                    ? ['#065f46', '#0aab7e']
                    : ['#34d399', '#10b981']
                  : colorScheme === 'dark'
                  ? ['#3d516d', '#1f2937']
                  : ['#d1d5db', '#e7eaed']
              }
            >
              <P>{item.subtitle}</P>
            </Skeleton>
          </TouchableOpacity>
        )
      }}
    />
  )
}
