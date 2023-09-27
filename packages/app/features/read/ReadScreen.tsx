import { Fragment, useEffect, useMemo, useRef } from 'react'
import {
  FlatList,
  Dimensions,
  ListRenderItemInfo,
  Platform,
} from 'react-native'
import { P, View, ActivityIndicator, useSx, useDripsyTheme } from 'dripsy'

// Components
import FadeInView from 'app/components/FadeInView'
import ReadScreenNavigator from './components/ReadScreenNavigator'
import PassageTypography from './components/PassageTypography'

// Contexts
import { useReadPassageContext } from './contexts/ReadPassageContext'
import { useReadSettingsContext } from './contexts/ReadSettingsContext'

// Queries
import {
  useBibleByDateQuery,
  useBibleByPassageQuery,
} from 'app/utils/hooks/useBibleQuery'

// Utils
import dayjs from 'app/utils/dayjs'

// Types
import type { VerseData } from 'app/types'

export default function ReadScreen() {
  const sx = useSx()
  const {
    theme: { colors },
  } = useDripsyTheme()
  const flatListRef = useRef<FlatList>()
  const height = Dimensions.get('window').height

  // Contexts
  const {
    verseFontSize,
    headerFontSize,
    verseLineHeight,
    verseNumberFontSize,
    verseNumberLineHeight,
  } = useReadSettingsContext()
  const {
    bibleVersion,
    inGuide,
    passage,
    guideDate,
    guidePassage,
    highlightedText,
    guideHasBeenRead,
    setHighlightedText,
    setGuideHasBeenRead,
  } = useReadPassageContext()

  // Query
  const {
    data: bibleByDateData,
    isLoading: bibleByDateLoading,
    error: bibleByDateError,
  } = useBibleByDateQuery({
    date: guideDate,
    bibleVersion,
    enabled: inGuide,
  })
  const {
    data: bibleByPassageData,
    isLoading: bibleByPassageLoading,
    error: bibleByPassageError,
  } = useBibleByPassageQuery({ passage, bibleVersion, enabled: !inGuide })
  const isLoading = inGuide ? bibleByDateLoading : bibleByPassageLoading
  const error = inGuide ? bibleByDateError : bibleByPassageError

  // Memoized Variables
  const computedVersesData = useMemo(() => {
    if (!inGuide) {
      return bibleByPassageData?.data || []
    }
    if (guidePassage.includes('pl')) {
      return (
        bibleByDateData?.pl.find((i) => i.passagePlace === guidePassage)
          ?.data || []
      )
    }
    if (guidePassage.includes('pb')) {
      return (
        bibleByDateData?.pb.find((i) => i.passagePlace === guidePassage)
          ?.data || []
      )
    }
    if (guidePassage.includes('in')) {
      return (
        bibleByDateData?.in.find((i) => i.passagePlace === guidePassage)
          ?.data || []
      )
    }
    return []
  }, [inGuide, guidePassage, bibleByDateData, bibleByPassageData])

  // Methods & Renderer
  const renderIndentation = (index: string) => {
    switch (index.length) {
      case 1:
        return '    '
      case 2:
        return '     '
      case 3:
        return '       '
      default:
        return '    '
    }
  }

  const highlightText = (verse: number, content: string) => {
    if (highlightedText.find((i) => i.verse === verse)) {
      setHighlightedText(highlightedText.filter((i) => i.verse !== verse))
    } else {
      setHighlightedText([...highlightedText, { verse, content }])
    }
  }

  const onMomentumScrollEnd = async ({
    nativeEvent: { layoutMeasurement, contentOffset, contentSize },
  }) => {
    if (
      (guidePassage.includes('pb') || guidePassage.includes('in')) &&
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    ) {
      const date = guideDate || dayjs().format('DD-MM-YYYY')

      if (!guideHasBeenRead.includes(date)) {
        setGuideHasBeenRead([...guideHasBeenRead, date])
      }
    }
  }

  const scrollToTop = () =>
    flatListRef.current!.scrollToIndex({
      index: 0,
      viewOffset: 15,
    })

  // Side-Effects
  useEffect(() => {
    // Wait until the flatListRef is ready then,
    // trigger scrollToTop right after the `guidePassage` and/or `bibleVersion` changes.
    if (flatListRef.current) {
      if (!isLoading) {
        if (computedVersesData && computedVersesData.length > 0) {
          scrollToTop()
        }
      }
    }
  }, [passage, guidePassage, bibleVersion, isLoading, computedVersesData])

  useEffect(() => {
    if (
      (guidePassage.includes('pb') || guidePassage.includes('in')) &&
      height >= 812 &&
      computedVersesData!.length < 5
    ) {
      const date = guideDate || dayjs().format('DD-MM-YYYY')

      if (!guideHasBeenRead.includes(date)) {
        setGuideHasBeenRead([...guideHasBeenRead, date])
      }
    }
  }, [
    height,
    guideDate,
    guidePassage,
    guideHasBeenRead,
    bibleByDateData,
    computedVersesData,
    setGuideHasBeenRead,
  ])

  return (
    <Fragment>
      {error ? (
        <View sx={{ paddingTop: 20, paddingX: 'md' }}>
          <P>
            Terjadi kesalahan saat mengambil data alkitab. Mohon coba beberapa
            saat lagi.
          </P>
        </View>
      ) : isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color={colors!.tabText as string} />
        </View>
      ) : (
        <FadeInView>
          <FlatList
            ref={flatListRef as any}
            data={computedVersesData}
            style={{ flex: 1 }}
            overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
            contentContainerStyle={sx({
              width: '100%',
              paddingY: Platform.OS === 'ios' && height >= 812 ? 28 : undefined,
              paddingTop: Platform.OS === 'ios' && height <= 667 ? 20 : 16,
              paddingBottom: 190,
              paddingX: ['md', 'lg'],
            })}
            onMomentumScrollEnd={onMomentumScrollEnd}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }: ListRenderItemInfo<VerseData>) => (
              <PassageTypography
                item={item}
                highlightedText={highlightedText}
                headerFontSize={headerFontSize}
                verseFontSize={verseFontSize}
                verseLineHeight={verseLineHeight}
                verseNumberFontSize={verseNumberFontSize}
                verseNumberLineHeight={verseNumberLineHeight}
                renderIndentation={renderIndentation}
                highlightText={highlightText}
              />
            )}
          />
        </FadeInView>
      )}

      {!isLoading && !error && (
        <ReadScreenNavigator passageArray={bibleByDateData?.passage} />
      )}
    </Fragment>
  )
}
