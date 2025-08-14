import { useCallback, useEffect, useMemo, useRef } from 'react'
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
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../contexts/read-passage.context'
import { useReadLocalDatabaseMobile } from '../../local-databases/mobile/index.mobile'
import { useSaverSheetStoreMobileContext } from '../../../../providers/bottom-sheet/saver-bottom-sheet/saver-bottom-sheet.mobile'
import {
  useSavedVersesActionContext,
  useSavedVersesContext,
} from '../../../saved/contexts/saved-verses.context'

// Queries
import {
  useBibleByDateQuery,
  useBibleByPassageQuery,
} from '../../../../hooks/use-bible-query'

// Utils
import dayjs from '../../../../utils/dayjs'
import { parseCurrentPassage } from '../../../../utils/helpers'

// Types
import type { ReadTypographyProps } from './types'

// Props are being used by the web component
export default function ReadTypography(_: ReadTypographyProps) {
  const { guidedEnabled, selectedBiblePassage } =
    useReadPassagePersistedContext()
  const guided = useReadPassageGeneralContext((state) => state.guided)
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )
  const { insertSelectedText, updateSelectedText } =
    useReadPassageGeneralContext((state) => state.actions)
  const { downloadedData, getBibleData } = useReadLocalDatabaseMobile()
  const saverSheetOpen = useSaverSheetStoreMobileContext(
    (state) => state.saverSheetOpen,
  )
  const currentContextVerses = useSavedVersesContext(
    (state) => state.currentContextVerses,
  )
  const { loadCurrentContextVerses } = useSavedVersesActionContext()

  // Refs
  const bibleTypographyRef = useRef<FlatList>(null)

  // Queries
  const {
    data: bibleByDateData,
    isLoading: bibleByDateLoading,
    isError: bibleByDateError,
  } = useBibleByDateQuery({
    date: guided.date,
    bibleVersion: selectedBibleVersion,
    enabled: guidedEnabled,
  })
  const {
    data: bibleByPassageData,
    isLoading: bibleByPassageLoading,
    isError: bibleByPassageError,
  } = useBibleByPassageQuery({
    passage: selectedBiblePassage,
    bibleVersion: selectedBibleVersion,
    enabled: !guidedEnabled && selectedBiblePassage !== 'invalid',
    localBibleData: {
      isDownloaded: downloadedData[selectedBibleVersion] === 1189,
      getBibleData,
    },
  })

  // Constants
  const isLoading = guidedEnabled ? bibleByDateLoading : bibleByPassageLoading
  const isError = guidedEnabled ? bibleByDateError : bibleByPassageError

  // Memoized Values
  const versesData = useMemo(() => {
    // Handle when not guided - basic bible reading
    if (!guidedEnabled) {
      return bibleByPassageData?.data || []
    }

    // Handled when guided
    if (guided.selectedOrder.includes('pl')) {
      return (
        bibleByDateData?.pl.find((i) => i.passagePlace === guided.selectedOrder)
          ?.data || []
      )
    }
    if (guided.selectedOrder.includes('pb')) {
      return (
        bibleByDateData?.pb.find((i) => i.passagePlace === guided.selectedOrder)
          ?.data || []
      )
    }
    if (guided.selectedOrder.includes('in')) {
      return (
        bibleByDateData?.in.find((i) => i.passagePlace === guided.selectedOrder)
          ?.data || []
      )
    }

    // Fallback
    return []
  }, [guidedEnabled, guided.selectedOrder, bibleByDateData, bibleByPassageData])

  const passageData = useMemo(() => {
    // Return: `${book} ${chapter}`
    // Example: `Kejadian 1`
    // Fallback: ''

    // Handle when guided
    if (guidedEnabled) {
      if (guided.selectedOrder.includes('pl')) {
        const bibleByDateDataPL = bibleByDateData?.pl.find(
          (i) => i.passagePlace === guided.selectedOrder,
        )

        return bibleByDateDataPL
          ? `${bibleByDateDataPL.book} ${bibleByDateDataPL.chapter}`
          : ''
      }
      if (guided.selectedOrder.includes('pb')) {
        const bibleByDateDataPB = bibleByDateData?.pb.find(
          (i) => i.passagePlace === guided.selectedOrder,
        )

        return bibleByDateDataPB
          ? `${bibleByDateDataPB.book} ${bibleByDateDataPB.chapter}`
          : ''
      }
      if (guided.selectedOrder.includes('in')) {
        const bibleByDateDataIN = bibleByDateData?.in.find(
          (i) => i.passagePlace === guided.selectedOrder,
        )

        return bibleByDateDataIN
          ? `${bibleByDateDataIN.book} ${bibleByDateDataIN.chapter}`
          : ''
      }
    }

    // Handle when not guided
    return bibleByPassageData
      ? `${bibleByPassageData.book} ${bibleByPassageData.chapter}`
      : ''
  }, [guidedEnabled, guided.selectedOrder, bibleByDateData, bibleByPassageData])

  const highlightOrBookmarkData = useMemo(() => {
    const { data, status } = parseCurrentPassage(passageData)

    if (status === 'error') return undefined

    const filteredSavedVerses = currentContextVerses.filter(
      (i) => i.book === data!.book && i.chapter === data!.chapter,
    )

    if (filteredSavedVerses.length === 0) return undefined

    const formattedFilteredSavedVerses = filteredSavedVerses.reduce(
      (object, item) => {
        object[item.verse] = {
          kind: item.kind,
          color: item.color,
        }

        return object
      },
      {} as Record<string, { kind: string; color: string | null }>,
    )

    return formattedFilteredSavedVerses
  }, [currentContextVerses, passageData])

  // Methods
  const nativeScrollToTop = () => {
    bibleTypographyRef!.current?.scrollToIndex({ index: 0, viewOffset: 15 })
  }

  const onVerseClick = useCallback(
    (content: string, verse: number) => {
      if (selectedText.find((i) => i.verse === verse)) {
        const filteredSelectedText = selectedText.filter(
          (i) => i.verse !== verse,
        )

        updateSelectedText(filteredSelectedText)
      } else {
        insertSelectedText({ passage: passageData, verse, content })
      }
    },
    [selectedText, passageData],
  )

  const onMomentumScrollEnd = async ({
    nativeEvent: { layoutMeasurement, contentOffset, contentSize },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (
      (guided.selectedOrder.includes('pb') ||
        guided.selectedOrder.includes('in')) &&
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
    // - guided.selectedOrder (when guided)
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
    guided.selectedOrder,
    isLoading,
    versesData,
    selectedBiblePassage,
    selectedBibleVersion,
  ])

  useEffect(() => {
    // This effect is triggered when passageData & selectedBibleVersion changes
    // To load saved verses for current context (current bible version, book & chapter)
    if (passageData) {
      const { status, data } = parseCurrentPassage(passageData)

      if (status === 'error') return

      loadCurrentContextVerses({
        book: data!.book,
        chapter: data!.chapter,
        selectedBibleVersion,
      })
    }
  }, [passageData, selectedBibleVersion])

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
            isSelected={selectedText.some((i) => i.verse === item.verse)}
            highlightOrBookmarkData={
              highlightOrBookmarkData?.[String(item.verse)]
            }
            onClick={onVerseClick}
          />
        )}
        contentContainerClassName="sm:px-8 sm:gap-1"
        contentContainerStyle={{
          paddingBottom: saverSheetOpen ? 310 : 176,
        }}
      />

      <ReadTypographyNavigator passageArray={bibleByDateData?.passage || []} />
    </>
  )
}
