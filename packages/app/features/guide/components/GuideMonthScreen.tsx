import {
  ListRenderItemInfo,
  Platform,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native'
import { Text, useSx, View } from 'dripsy'
import { useRouter } from 'solito/router'

// Contexts
import { useReadPassageContext } from 'app/features/read/contexts/ReadPassageContext'

// Utils
import dayjs from 'app/utils/dayjs'

// Types
import type { PropsWithChildren } from 'react'

interface MonthItem {
  name: string
  value: string
}
const monthList: MonthItem[] = [
  { name: 'Januari', value: '01' },
  { name: 'Februari', value: '02' },
  { name: 'Maret', value: '03' },
  { name: 'April', value: '04' },
  { name: 'Mei', value: '05' },
  { name: 'Juni', value: '06' },
  { name: 'Juli', value: '07' },
  { name: 'Agustus', value: '08' },
  { name: 'September', value: '09' },
  { name: 'Oktober', value: '10' },
  { name: 'November', value: '11' },
  { name: 'Desember', value: '12' },
]

export function GuideMonthScreen({
  onMonthOptionPress,
}: PropsWithChildren<{
  onMonthOptionPress?: () => void
}>) {
  const sx = useSx()
  const colorScheme = useColorScheme()
  const { back } = useRouter()

  // Contexts
  const { guideMonth, setGuideMonth } = useReadPassageContext()

  // Methods
  const onPress = (month: string) => {
    setGuideMonth(month)

    if (typeof onMonthOptionPress === 'function') {
      onMonthOptionPress()
      return
    }

    back()
  }

  return (
    <FlatList
      data={monthList}
      keyExtractor={(item: MonthItem) => item.name}
      scrollEventThrottle={16}
      style={{ flex: 1 }}
      contentContainerStyle={sx({ paddingY: 10, paddingX: [0, '2xl'] })}
      renderItem={({ item }: ListRenderItemInfo<MonthItem>) => (
        <TouchableOpacity
          style={sx({
            marginY: 6,
            marginX: 16,
            paddingY: 14,
            paddingX: 'md',
            borderRadius: 8,
            boxShadow:
              Number(item.value) > Number(dayjs().format('MM'))
                ? 'none'
                : 'container',
            backgroundColor:
              Number(item.value) > Number(dayjs().format('MM'))
                ? 'buttonDisabled'
                : item.value === guideMonth
                ? 'tabActive'
                : 'tab',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: Platform.OS !== 'web' && item.value === '12' ? 50 : 6,
          })}
          onPress={() =>
            Number(item.value) <= Number(dayjs().format('MM'))
              ? onPress(item.value)
              : undefined
          }
          disabled={Number(item.value) > Number(dayjs().format('MM'))}
        >
          <Text
            sx={{
              color:
                Number(item.value) > Number(dayjs().format('MM'))
                  ? 'buttonTextDisabled'
                  : item.value === guideMonth
                  ? 'tabTextActive'
                  : 'text',
              fontWeight: item.value === guideMonth ? '800' : undefined,
            }}
            // @ts-ignore
            // https://github.com/nandorojo/dripsy/issues/206
            style={
              Platform.OS === 'web' && item.value === guideMonth
                ? { fontWeight: '800' }
                : undefined
            }
          >
            {item.name}
          </Text>

          {item.value === dayjs().format('MM') && (
            <View
              sx={{
                paddingX: 'sm',
                paddingY: 4,
                borderRadius: 6,
                backgroundColor:
                  item.value !== guideMonth ? 'guideMonthLabel' : 'white',
              }}
            >
              <Text
                sx={{
                  textTransform: 'uppercase',
                  color:
                    item.value !== guideMonth && colorScheme === 'dark'
                      ? 'white'
                      : '#064e3b',
                  letterSpacing: 0.8,
                  fontSize: 'sm',
                }}
              >
                Bulan Ini
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      initialNumToRender={15}
      maxToRenderPerBatch={5}
      windowSize={15}
    />
  )
}
