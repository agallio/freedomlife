import { useEffect, useMemo, useRef } from 'react'
import {
  FlatList,
  Platform,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Components
import { Text } from '../../../../components/text'
import ReadTypographyItem from './components/read-typography-item'
import ReadTypographyNavigator from './components/read-typography-navigator'
import ReadTypographyLoading from './components/read-typography-loading'

// Contexts
import { useReadPassageContext } from '../../contexts/read-passage.context'
import { useReadLocalDatabaseMobile } from '../../local-databases/mobile/index.mobile'

// Queries
import {
  useBibleByDateQuery,
  useBibleByPassageQuery,
} from '../../../../hooks/use-bible-query'

// Utils
import dayjs from '../../../../utils/dayjs'

// Types
import type { ReadTypographyProps } from './types'

export default function ReadTypography({
  redirectToBiblePassage,
}: ReadTypographyProps) {
  const {
    guided,
    selectedBiblePassage,
    selectedBibleVersion,
    highlightedText,
    insertHighlightedText,
    updateHighlightedText,
  } = useReadPassageContext()
  const { downloadedData, getBibleData } = useReadLocalDatabaseMobile()

  // Refs
  const bibleTypographyRef = useRef<FlatList>()

  // Queries
  const {
    data: bibleByDateData,
    isLoading: bibleByDateLoading,
    isError: bibleByDateError,
  } = useBibleByDateQuery({
    date: guided.date,
    bibleVersion: selectedBibleVersion,
    enabled: guided.enabled,
  })
  const {
    data: bibleByPassageData,
    isLoading: bibleByPassageLoading,
    isError: bibleByPassageError,
  } = useBibleByPassageQuery({
    passage: selectedBiblePassage,
    bibleVersion: selectedBibleVersion,
    enabled: !guided.enabled && selectedBiblePassage !== 'invalid',
    localBibleData: {
      isDownloaded: downloadedData[selectedBibleVersion] === 1189,
      getBibleData,
    },
  })

  // Constants
  const isLoading = guided.enabled ? bibleByDateLoading : bibleByPassageLoading
  const isError = guided.enabled ? bibleByDateError : bibleByPassageError

  // Memoized Values
  const versesData = useMemo(() => {
    // Handle when not guided - basic bible reading
    if (!guided.enabled) {
      return bibleByPassageData?.data || []
    }

    // Handled when guided
    if (guided.selectedPassage.includes('pl')) {
      return (
        bibleByDateData?.pl.find(
          (i) => i.passagePlace === guided.selectedPassage,
        )?.data || []
      )
    }
    if (guided.selectedPassage.includes('pb')) {
      return (
        bibleByDateData?.pb.find(
          (i) => i.passagePlace === guided.selectedPassage,
        )?.data || []
      )
    }
    if (guided.selectedPassage.includes('in')) {
      return (
        bibleByDateData?.in.find(
          (i) => i.passagePlace === guided.selectedPassage,
        )?.data || []
      )
    }

    // Fallback
    return []
  }, [
    guided.enabled,
    guided.selectedPassage,
    bibleByDateData,
    bibleByPassageData,
  ])

  // Methods
  const nativeScrollToTop = () => {
    bibleTypographyRef!.current?.scrollToIndex({ index: 0, viewOffset: 15 })
  }

  const onVerseClick = (content: string, verse: number) => {
    if (highlightedText.find((i) => i.verse === verse)) {
      updateHighlightedText(highlightedText.filter((i) => i.verse !== verse))
    } else {
      insertHighlightedText({ verse, content })
    }
  }

  const onMomentumScrollEnd = async ({
    nativeEvent: { layoutMeasurement, contentOffset, contentSize },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (
      (guided.selectedPassage.includes('pb') ||
        guided.selectedPassage.includes('in')) &&
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    ) {
      const storageKey = `read-${guided.date || dayjs().format('DD-MM-YYYY')}`

      const isKeyExists = (await AsyncStorage.getItem(storageKey)) !== null

      if (isKeyExists) return

      await AsyncStorage.setItem(storageKey, 'true')
    }
  }

  // Effects
  useEffect(() => {
    // This effect is triggered when either one of these values changed:
    // - guided.selectedPassage (when guided)
    // - selectedBiblePassage (when not guided)
    // - selectedBibleVersion
    //
    // If one of them has changed, trigger scroll to top.
    if (bibleTypographyRef.current) {
      if (!isLoading) {
        if (versesData && versesData.length > 0) {
          nativeScrollToTop()
        }
      }
    }
  }, [
    guided.selectedPassage,
    isLoading,
    versesData,
    selectedBiblePassage,
    selectedBibleVersion,
  ])

  if (isLoading) {
    return (
      <View className="absolute top-0">
        <ReadTypographyLoading />
      </View>
    )
  }

  if (isError) {
    return (
      <Text className="mt-4 px-4 sm:px-0">
        Terjadi kesalahan saat mengambil data Alkitab. Mohon coba beberapa saat
        lagi.
      </Text>
    )
  }

  return (
    <>
      <FlatList
        ref={bibleTypographyRef as any}
        data={versesData}
        overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => (
          <ReadTypographyItem
            item={item}
            index={index}
            isHighlighted={highlightedText.some((i) => i.verse === item.verse)}
            onClick={onVerseClick}
          />
        )}
        contentContainerClassName="pb-44 sm:px-8 sm:gap-1"
      />

      <ReadTypographyNavigator
        passageArray={bibleByDateData?.passage || []}
        redirectToBiblePassage={redirectToBiblePassage}
      />
    </>
  )
}
