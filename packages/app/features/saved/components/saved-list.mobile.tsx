import { useMemo } from 'react'
import {
  FlatList,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'
import { BookmarkIcon } from 'react-native-heroicons/solid'

// Components
import { Header, Text } from '../../../components/text'
import { PressableCard } from '../../../components/card'

// Database
import SavedVerseModel from '../../../database/models/saved-verse.model'

// Contexts
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../read/contexts/read-passage.context'

// Utils
import { cn } from '../../../utils/helpers'
import {
  bibleTranslationsFlat,
  highlighterColors,
} from '../../../utils/constants'

type SavedListProps = {
  savedVerses: SavedVerseModel[]
  isError: boolean
  hasFilters: boolean
}

export default function SavedList({
  savedVerses,
  isError,
  hasFilters,
}: SavedListProps) {
  if (isError) {
    return (
      <View className="gap-4 px-6 min-[744px]:px-40 md:px-52 lg:px-96">
        <View className="flex items-center justify-center py-4">
          <Text className="text-center">
            Gagal memuat ayat tersimpan. Coba beberapa saat lagi.
          </Text>
        </View>
      </View>
    )
  }

  if (savedVerses.length === 0) {
    const emptyMessage = hasFilters
      ? 'Tidak ada ayat yang sesuai dengan filter'
      : 'Belum ada ayat tersimpan'

    return (
      <View className="gap-4 px-6 pb-28 pt-4 min-[744px]:px-40 md:px-52 lg:px-96">
        <View className="flex items-center justify-center py-8">
          <Text className="text-center text-gray-600 dark:text-gray-400">
            {emptyMessage}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={savedVerses}
      keyExtractor={(item) => item.id}
      scrollEventThrottle={16}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={4}
      renderItem={({ item }: { item: SavedVerseModel }) => (
        <SavedVerseCard verse={item} />
      )}
      contentContainerClassName="pt-4 px-6 pb-28 gap-4 min-[744px]:px-40 md:px-52 lg:px-96"
    />
  )
}

function SavedVerseCard({ verse }: { verse: SavedVerseModel }) {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const { fontScale } = useWindowDimensions()
  const { setSelectedBiblePassage, setGuidedEnabled } =
    useReadPassagePersistedContext()
  const setSelectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.actions.setSelectedBibleVersion,
  )

  // Memoized Values
  const textHighlightedColors = useMemo(() => {
    if (verse.kind === 'bookmark') {
      return { backgroundColor: '', textColor: '' }
    }

    if (verse.kind === 'highlight' && verse.color) {
      return {
        backgroundColor: highlighterColors[verse.color].color,
        textColor: highlighterColors[verse.color].textColor,
      }
    }

    return { backgroundColor: '', textColor: '' }
  }, [verse.kind, verse.color])

  const bookmarkIconColor = useMemo(() => {
    return colorScheme === 'light' ? '#047857' : '#10b981'
  }, [colorScheme])

  const bibleTranslationVersion = useMemo(() => {
    return bibleTranslationsFlat.find((item) => item.key === verse.version)
  }, [verse.version])

  // Methods
  const handleVersePress = () => {
    setGuidedEnabled(false)
    setSelectedBiblePassage(`${verse.abbr}-${verse.chapter}`)
    setCorrectBibleVersion(verse.version)
    router.push('/read')
  }

  const setCorrectBibleVersion = (version: string) => {
    const bibleTranslationsArray = bibleTranslationsFlat.map(
      (version) => version.key,
    )

    const correctBibleTranslation = bibleTranslationsArray.includes(version)
      ? version
      : 'tb'

    setSelectedBibleVersion(correctBibleTranslation)
  }

  return (
    <PressableCard
      onPress={handleVersePress}
      title={
        <View className="w-full flex-row justify-between px-4 py-3">
          <View>
            <Header
              aria-level={2}
              customFontSize="text-lg"
              className="leading-snug"
            >
              {verse.book} {verse.chapter}:{verse.verse}
            </Header>
            <Text>{bibleTranslationVersion?.name || ''}</Text>
          </View>
          {verse.kind === 'bookmark' && (
            <View className="mt-0.5">
              <BookmarkIcon size={20} color={bookmarkIconColor} />
            </View>
          )}
        </View>
      }
    >
      <View className="gap-3 px-4 pb-4 pt-3">
        <Text>
          <Text
            className={cn(
              'text-gray-900 dark:text-white',
              textHighlightedColors.textColor,
              textHighlightedColors.backgroundColor,
            )}
            style={{
              fontSize: 17 * fontScale,
              lineHeight: 17 * fontScale * 1.75,
            }}
          >
            {verse.verseText}
          </Text>
        </Text>
      </View>
    </PressableCard>
  )
}
