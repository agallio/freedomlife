import { useMemo } from 'react'
import { Platform, TouchableOpacity, useColorScheme, View } from 'react-native'
import {
  CheckIcon,
  BookmarkIcon as BookmarkIconSolid,
  DocumentDuplicateIcon,
} from 'react-native-heroicons/solid'
import { BookmarkIcon as BookmarkIconOutline } from 'react-native-heroicons/outline'

// Components
import { Text } from '../../../../components/text'
import { Button } from '../../../../components/button'

// Contexts
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../contexts/read-passage.context'
import {
  useSavedVersesActionContext,
  useSavedVersesContext,
} from '../../../../features/saved/contexts/saved-verses.context'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from '../../../../hooks/use-guide-query'

// Utils
import {
  cn,
  getIconColor,
  parseCurrentPassage,
  parseCurrentPassageAbbr,
} from '../../../../utils/helpers'
import {
  highlighterColors,
  type HighlighterColorType,
} from '../../../../utils/constants'

// Types
import type { SaverScreenComponentProps } from './types'

export default function SaverScreenComponent({
  handleCopyClick,
}: SaverScreenComponentProps) {
  const colorScheme = useColorScheme()
  const { guidedEnabled, selectedBiblePassage } =
    useReadPassagePersistedContext()
  const guided = useReadPassageGeneralContext((state) => state.guided)
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const currentContextVerses = useSavedVersesContext(
    (state) => state.currentContextVerses,
  )
  const { toggleVerseHighlight, toggleVerseBookmark } =
    useSavedVersesActionContext()

  // Constants
  const defaultIconColor = getIconColor(colorScheme)

  // Queries
  const { data: guideTodayData } = useGuideTodayQuery()
  const { data: guideByDateData } = useGuideByDateQuery({
    date: guided.date,
    enabled: guidedEnabled && guided.date !== '',
  })

  // Memoized Values
  const currentPassageData = useMemo(() => {
    if (guidedEnabled) {
      const activeGuideData =
        guided.date && guideByDateData ? guideByDateData : guideTodayData

      const activePassage = activeGuideData?.guide_bible_data?.find(
        (bibleData) => bibleData.value === guided.selectedOrder,
      )?.title

      if (!activePassage) return undefined

      const { status, data } = parseCurrentPassage(activePassage)

      if (status === 'error') return undefined

      return {
        chapter: data!.chapter,
        book: data!.book,
        abbr: data!.abbr,
      }
    }

    const { status, data } = parseCurrentPassageAbbr(selectedBiblePassage)

    if (status === 'error') return undefined

    return {
      chapter: data!.chapter,
      book: data!.book,
      abbr: data!.abbr,
    }
  }, [
    guidedEnabled,
    guided,
    guideByDateData,
    guideTodayData,
    selectedBiblePassage,
  ])

  const verseState = useMemo(() => {
    if (selectedText.length === 0 || !currentPassageData) {
      return undefined
    }

    // Get state for each selected verse
    const verseStates = selectedText.map((selectedVerse) => {
      const verse = String(selectedVerse.verse)

      // Find saved records for this specific verse
      const matchingVerses = currentContextVerses.filter(
        (savedVerse) =>
          savedVerse.verse === verse &&
          savedVerse.chapter === currentPassageData.chapter &&
          savedVerse.book === currentPassageData.book &&
          savedVerse.version === selectedBibleVersion,
      )

      // Process saved records to extract UI state
      const savedVerse = matchingVerses.length > 0 ? matchingVerses[0] : null
      const color = savedVerse?.kind === 'highlight' ? savedVerse.color : null
      const isBookmarked = savedVerse?.kind === 'bookmark'

      return { color, isBookmarked }
    })

    // For UI state, check if ALL verses have the same state
    const firstVerseState = verseStates[0]
    const allHaveSameColor = verseStates.every(
      (state) => state.color === firstVerseState.color,
    )
    const allBookmarked = verseStates.every((state) => state.isBookmarked)

    return {
      color: allHaveSameColor ? firstVerseState.color : null,
      isBookmarked: allBookmarked,
    }
  }, [
    selectedText,
    currentPassageData,
    currentContextVerses,
    selectedBibleVersion,
  ])

  // Methods
  const handleColorClick = async ({
    type,
    colorValue,
  }: {
    type: 'bookmark' | 'highlight'
    colorValue: string
  }) => {
    if (selectedText.length === 0 || !currentPassageData) return

    const verses = selectedText.map((item) => ({
      verseNumber: String(item.verse),
      verseText: item.content,
    }))

    if (type === 'bookmark') {
      // Toggle bookmark
      await toggleVerseBookmark({
        verses,
        chapter: currentPassageData.chapter,
        book: currentPassageData.book,
        abbr: currentPassageData.abbr,
        selectedBibleVersion,
      })
    } else {
      // Toggle highlight with selected color
      await toggleVerseHighlight({
        verses,
        chapter: currentPassageData.chapter,
        book: currentPassageData.book,
        abbr: currentPassageData.abbr,
        color: colorValue,
        selectedBibleVersion,
      })
    }
  }

  return (
    <View className="my-2 flex flex-col items-center gap-4">
      <View className="w-full items-center justify-center border-b border-gray-300 pb-4 dark:border-gray-700">
        <View>
          <Button
            text="Salin Ayat"
            icon={
              <View className="mr-1.5">
                <DocumentDuplicateIcon size={20} color={defaultIconColor} />
              </View>
            }
            className="border border-gray-200 bg-white dark:border-gray-600"
            onClick={handleCopyClick}
          />
        </View>
      </View>

      <View className="flex w-full max-w-[300px] flex-row justify-between">
        {Object.entries(highlighterColors).map(([key, value]) => (
          <HighlightBookmarkButton
            key={key}
            keyString={key}
            value={value}
            verseState={verseState}
            handleColorClick={handleColorClick}
          />
        ))}
      </View>

      <View>
        <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
          Tekan warna untuk menyorot ayat atau tekan ikon untuk menandai
          pembatas buku.
        </Text>
      </View>
    </View>
  )
}

function HighlightBookmarkButton({
  keyString,
  value,
  verseState,
  handleColorClick,
}: {
  keyString: string
  value: HighlighterColorType[string]
  verseState?: {
    color: string | null
    isBookmarked: boolean
  }
  handleColorClick: (_data: {
    type: 'bookmark' | 'highlight'
    colorValue: string
  }) => void
}) {
  const colorScheme = useColorScheme()

  // Determine if this color is active for the current verse
  const isActive = useMemo(
    () =>
      verseState
        ? keyString === 'bookmark'
          ? verseState.isBookmarked
          : verseState.color === keyString
        : false,
    [verseState, keyString],
  )

  return (
    <TouchableOpacity
      accessible
      key={keyString}
      accessibilityRole="button"
      accessibilityLabel={value.accessibility.label}
      accessibilityHint={value.accessibility.hint}
      onPress={() =>
        handleColorClick({
          type: keyString === 'bookmark' ? 'bookmark' : 'highlight',
          colorValue: keyString,
        })
      }
    >
      <View
        className={cn(
          'flex h-[50px] w-[50px] items-center justify-center rounded-full',
          Platform.OS === 'web' &&
            `transition duration-200 ease-in-out ${value.hoverColor}`,
          value.color,
        )}
      >
        {/* Show bookmark icon for bookmark button */}
        {keyString === 'bookmark' ? (
          isActive ? (
            <BookmarkIconSolid
              size={24}
              color={value.iconColor[colorScheme || 'light']}
            />
          ) : (
            <BookmarkIconOutline
              size={24}
              color={value.iconColor[colorScheme || 'light']}
            />
          )
        ) : null}

        {/* Show checkmark on active highlight color */}
        {keyString !== 'bookmark' && isActive ? (
          <CheckIcon
            size={22}
            color={value.iconColor[colorScheme || 'light']}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  )
}
