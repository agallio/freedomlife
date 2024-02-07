import { useMemo } from 'react'
import {
  ColorSchemeName,
  Platform,
  TouchableOpacity,
  useColorScheme,
} from 'react-native'
import { useRouter } from 'solito/router'
import * as Clipboard from 'expo-clipboard'
import { useSx, View, Text } from 'dripsy'
import {
  CogIcon,
  LanguageIcon,
  XMarkIcon,
  DocumentDuplicateIcon,
  BookOpenIcon,
} from 'react-native-heroicons/solid'
import * as Burnt from 'burnt'

// Utils
import { generateTextToCopy } from 'app/utils/read'
import { passageData } from 'app/utils/constants'

// Contexts
import { useReadPassageContext } from '../contexts/ReadPassageContext'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from 'app/utils/hooks/useGuideQuery'

// Types
import type { GuideDataResponse } from 'app/types'

function ReadScreenToolbarLeft() {
  const sx = useSx()
  const { push } = useRouter()

  // Contexts
  const { highlightedText, setHighlightedText } = useReadPassageContext()

  return highlightedText.length > 0 ? (
    <TouchableOpacity onPress={() => setHighlightedText([])}>
      <XMarkIcon
        size={Platform.OS === 'android' ? 24 : 26}
        style={sx({ color: 'text' })}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => push('/translate')}>
      <LanguageIcon
        size={Platform.OS === 'android' ? 26 : 28}
        style={sx({ color: 'text' })}
      />
    </TouchableOpacity>
  )
}

function ReadScreenToolbarRight({
  passageName,
  bibleVersion,
}: {
  passageName: string
  bibleVersion: string
}) {
  const sx = useSx()
  const colorScheme = useColorScheme()
  const { push } = useRouter()

  // Contexts
  const { highlightedText, setHighlightedText } = useReadPassageContext()

  const copyText = async () => {
    if (Platform.OS !== 'web') {
      const textToCopy = generateTextToCopy(
        highlightedText,
        bibleVersion,
        passageName,
      )
      await Clipboard.setStringAsync(textToCopy)
      Burnt.toast({
        preset: 'custom',
        title: 'Ayat Tersalin!',
        duration: 1.5,
        icon: {
          ios: {
            name: 'checkmark.circle',
            color: colorScheme === 'light' ? '#047857' : '#6ee7b7',
          },
        },
      })
      setHighlightedText([])
    }
  }

  return highlightedText.length > 0 ? (
    <TouchableOpacity onPress={copyText}>
      <DocumentDuplicateIcon
        size={Platform.OS === 'android' ? 25 : 26}
        style={sx({ color: 'text' })}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => push('/setting')}>
      <CogIcon
        size={Platform.OS === 'android' ? 28 : 30}
        style={sx({ color: 'text' })}
      />
    </TouchableOpacity>
  )
}

function ReadScreenToolbarTitle({ passageName }: { passageName: string }) {
  const sx = useSx()
  const { push } = useRouter()

  // Contexts
  const { guidePassage, highlightedText } = useReadPassageContext()

  return highlightedText.length > 0 ? (
    <View>
      <Text sx={{ color: 'text', fontSize: 'lg', fontWeight: '800' }}>
        {highlightedText.length} Ayat Terpilih
      </Text>
    </View>
  ) : (
    <View>
      <TouchableOpacity
        onPress={() => push('/passage')}
        style={sx({
          borderRadius: 9999,
          backgroundColor: 'tabActive',
          boxShadow: 'float',
        })}
      >
        {guidePassage ? (
          <View
            sx={{
              position: 'absolute',
              bottom: 0,
              right: passageName.length > 27 ? -10 : -8,
              borderRadius: 9999,
              backgroundColor: 'bibleGuideIcon',
            }}
          >
            <BookOpenIcon
              size={passageName.length > 27 ? 16 : 14}
              style={sx({
                margin: passageName.length > 27 ? 6 : 4,
                color: 'text',
              })}
            />
          </View>
        ) : null}
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            sx={{
              paddingY: 8,
              paddingX: 20,
            }}
          >
            <Text
              sx={{
                color: 'text',
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              {passageName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export function ReadScreenToolbar({
  top,
  colorScheme,
}: {
  top: number
  colorScheme: ColorSchemeName
}) {
  // Contexts
  const {
    inGuide,
    passage,
    guidePassage,
    guideDate,
    highlightedText,
    bibleVersion,
  } = useReadPassageContext()

  // Queries
  const { data: guideTodayData, isLoading: guideTodayLoading } =
    useGuideTodayQuery()
  const {
    data: guideByDateData,
    isLoading: guideByDateLoading,
    error: guideByDateError,
  } = useGuideByDateQuery({
    date: guideDate,
    enabled: inGuide && guideDate !== '',
  })

  // Memoized Variables
  const passageName = useMemo(() => {
    if (guidePassage === '') {
      if (!passage) {
        return 'Memuat'
      }

      const [abbr, chapter] = passage.split('-')
      const chapterName = passageData.find((p) => p.abbr === abbr)?.name
      return `${chapterName} ${chapter}${
        bibleVersion !== 'tb' ? ` (${bibleVersion.toUpperCase()})` : ''
      }`
    }

    if (guideDate !== '') {
      if (guideByDateLoading) return 'Memuat'
      if (!guideByDateLoading || !guideByDateError) {
        const findData = guideByDateData?.guide_bible_data!.find(
          (i) => i.value === guidePassage,
        )
        return (
          `${findData?.title}${
            bibleVersion !== 'tb' ? ` (${bibleVersion.toUpperCase()})` : ''
          }` || ''
        )
      }
      return ''
    }

    if (guideTodayLoading) return 'Memuat'

    const findData = (
      guideTodayData as GuideDataResponse
    ).guide_bible_data!.find((i) => i.value === guidePassage)
    return (
      `${findData?.title}${
        bibleVersion !== 'tb' ? ` (${bibleVersion.toUpperCase()})` : ''
      }` || ''
    )
  }, [
    passage,
    bibleVersion,
    guideDate,
    guidePassage,
    guideByDateData,
    guideByDateLoading,
    guideByDateError,
    guideTodayData,
    guideTodayLoading,
  ])

  const cleanPassageName = useMemo(() => {
    const versionStripped = passageName.replace(/\((.*)\)/g, '')
    const verseSplitted = versionStripped.split(':')

    if (verseSplitted.length > 0) {
      const trimmedVerseSplitted = verseSplitted[0]?.trim() || ''
      return trimmedVerseSplitted as string
    }

    return versionStripped
  }, [passageName])

  return (
    <View
      sx={{
        width: '100%',
        paddingX: [24, '2xl'],
        paddingTop: top - 4,
        height: top + 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:
          highlightedText.length > 0
            ? colorScheme === 'light'
              ? '#6ee7b7'
              : '#047857'
            : undefined,
        borderBottomWidth: 1,
        borderBottomColor:
          colorScheme === 'light'
            ? highlightedText.length > 0
              ? '#34d399'
              : '#e6e6e6'
            : highlightedText.length > 0
              ? '#065f46'
              : '#374151',
      }}
    >
      <View
        sx={{
          flex: 1,
          alignItems: 'flex-start',
        }}
      >
        <ReadScreenToolbarLeft />
      </View>
      <View
        style={{
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: 240,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <ReadScreenToolbarTitle passageName={passageName} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <ReadScreenToolbarRight
          passageName={cleanPassageName}
          bibleVersion={bibleVersion}
        />
      </View>
    </View>
  )
}
