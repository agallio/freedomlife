import { type PropsWithChildren } from 'react'
import {
  ListRenderItemInfo,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Text, useSx, View } from 'dripsy'
import { useRouter } from 'solito/router'

// Contexts
import { useReadPassageContext } from '../contexts/ReadPassageContext'

interface TranslationItem {
  language: 'Bahasa Indonesia' | 'Bahasa Inggris'
  list: { name: string; value: string }[]
}

const translationList: TranslationItem[] = [
  {
    language: 'Bahasa Indonesia',
    list: [
      { value: 'tb', name: 'Terjemahan Baru (TB)' },
      { value: 'bis', name: 'Bahasa Indonesia Sehari-Hari (BIS)' },
      { value: 'fayh', name: 'Firman Allah Yang Hidup (FAYH)' },
      { value: 'vmd', name: 'Versi Mudah Dibaca (VMD)' },
    ],
  },
  {
    language: 'Bahasa Inggris',
    list: [
      { value: 'msg', name: 'The Message (MSG)' },
      { value: 'nkjv', name: 'New King James Version (NKJV)' },
      { value: 'amp', name: 'Amplified Bible (AMP)' },
      { value: 'niv', name: 'New International Version (NIV)' },
    ],
  },
]

export function TranslateScreen({
  onGuideOptionPress,
}: PropsWithChildren<{
  onGuideOptionPress?: () => void
}>) {
  const sx = useSx()
  const { back } = useRouter()

  // Contexts
  const { bibleVersion, setBibleVersion } = useReadPassageContext()

  // Methods
  const onPress = (item: string) => {
    setBibleVersion(item)

    if (typeof onGuideOptionPress === 'function') {
      onGuideOptionPress()
    } else {
      back()
    }
  }

  return (
    <FlatList
      data={translationList}
      style={{ flex: 1 }}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingVertical: 10 }}
      keyExtractor={(item: TranslationItem) => item.language}
      renderItem={({ item }: ListRenderItemInfo<TranslationItem>) => (
        <View sx={{ marginY: 6, marginX: [16, '2xl'] }}>
          <Text
            allowFontScaling={false}
            sx={{
              color: 'text',
              fontWeight: '500',
              marginBottom: 12,
            }}
            // @ts-ignore
            // https://github.com/nandorojo/dripsy/issues/206
            style={Platform.OS === 'web' ? { fontWeight: '500' } : undefined}
          >
            {item.language}
          </Text>
          {item.list.map((translation) => (
            <TouchableOpacity
              key={translation.value}
              style={sx({
                paddingY: 14,
                paddingX: 'md',
                boxShadow: 'container',
                borderRadius: 8,
                backgroundColor:
                  translation.value === bibleVersion ? 'tabActive' : 'tab',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom:
                  Platform.OS !== 'web' && translation.value === 'niv'
                    ? 50
                    : 12,
              })}
              onPress={() => onPress(translation.value)}
            >
              <Text
                allowFontScaling={false}
                sx={{
                  color:
                    translation.value === bibleVersion
                      ? 'tabTextActive'
                      : 'text',
                  fontWeight:
                    translation.value === bibleVersion ? '600' : undefined,
                }}
                // @ts-ignore
                // https://github.com/nandorojo/dripsy/issues/206
                style={
                  Platform.OS === 'web' && translation.value === bibleVersion
                    ? { fontWeight: '600' }
                    : undefined
                }
              >
                {translation.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  )
}
