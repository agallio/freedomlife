import { useMemo } from 'react'
import { Platform, TouchableOpacity, useWindowDimensions } from 'react-native'
import { View, Text, ScrollView, P, useSx } from 'dripsy'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'

// Contexts
import { useReadPassageContext } from '../contexts/ReadPassageContext'

// Utils
import { passageData } from 'app/utils/constants'

const { useParam } = createParam<{ passage: string }>()

export function PassageChapterScreen() {
  const sx = useSx()
  const { fontScale } = useWindowDimensions()
  const { push } = useRouter()
  const [passage] = useParam('passage')

  // Contexts
  const { setPassage } = useReadPassageContext()

  // Memoized Variables
  const passageDetailData = useMemo(
    () => passageData.find((i) => i.name.toLowerCase() === passage),
    [passage],
  )

  return (
    <ScrollView>
      <View
        sx={{
          backgroundColor: 'tab',
          borderRadius: 8,
          boxShadow: 'container',
          marginX: 'md',
          marginTop: 14,
          marginBottom: 40,
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
          style={Platform.OS === 'web' ? { fontWeight: '600' } : undefined}
        >
          {passage
            ? `${passage?.charAt(0).toUpperCase()}${passage?.slice(1)}`
            : ''}
        </Text>

        <View
          sx={{
            paddingY: 12,
            paddingX: 'md',
            backgroundColor: 'inGuideCard',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {Array.from(
            { length: passageDetailData?.passage || 0 },
            (_, i) => i + 1,
          ).map((item) => (
            <TouchableOpacity
              key={item}
              style={sx({
                margin: 4,
                flex: 1,
                minWidth: 50 * fontScale,
                minHeight: 50 * fontScale,
                maxWidth: 50 * fontScale,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: 'passageNumberBorder',
                borderRadius: 8,
              })}
              onPress={() => {
                setPassage(`${passageDetailData?.abbr}-${item}`)
                push('/read')
              }}
            >
              <P>{item}</P>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
