import { useCallback, useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Components
import { Text } from '../../../../components/text'
import { Button } from '../../../../components/button'
import ReadTypographyItem from './components/read-typography-item'
import ReadTypographyNavigator from './components/read-typography-navigator'
import ReadTypographyLoading from './components/read-typography-loading'

// Contexts
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../contexts/read-passage.context'
import { useReadLocalDatabaseWeb } from '../../local-databases/web/index.web'

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
  resetInvalidBibleChapter,
}: ReadTypographyProps) {
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
  const { downloadedData, getBibleData } = useReadLocalDatabaseWeb()

  // Refs
  const bibleTypographyRef = useRef<HTMLDivElement | null>(null)

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
      isDownloaded: downloadedData[selectedBibleVersion],
      getBibleData,
    },
  })

  // Constants
  const isLoading = guidedEnabled ? bibleByDateLoading : bibleByPassageLoading
  const isError = guidedEnabled
    ? bibleByDateError
    : bibleByPassageError || selectedBiblePassage === 'invalid'

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

  // Methods
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

  const handleScroll = async () => {
    if (
      !guided.selectedOrder.includes('pb') &&
      !guided.selectedOrder.includes('in')
    ) {
      return
    }

    const currentScrollPos = window.pageYOffset

    if (bibleTypographyRef.current?.scrollHeight) {
      if (
        window.innerHeight - (document.body.scrollHeight - currentScrollPos) >=
          -1 &&
        window.innerHeight - (document.body.scrollHeight - currentScrollPos) <=
          1
      ) {
        if (window) {
          const localStorageKey = `read-${
            guided.date || dayjs().format('DD-MM-YYYY')
          }`

          const isKeyExists =
            (await AsyncStorage.getItem(localStorageKey)) !== null

          if (isKeyExists) return

          AsyncStorage.setItem(localStorageKey, 'true')
        }
      }
    }
  }

  // Effects
  useEffect(() => {
    const watchScroll = () => window.addEventListener('scroll', handleScroll)

    watchScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  if (isLoading) {
    return (
      <View className="pb-44">
        <ReadTypographyLoading />
      </View>
    )
  }

  if (isError) {
    return (
      <ErrorComponent
        invalid={selectedBiblePassage === 'invalid'}
        resetInvalidBibleChapter={resetInvalidBibleChapter}
      />
    )
  }

  return (
    <View className="pb-44">
      <View ref={bibleTypographyRef as any} className="sm:gap-1">
        {versesData.map((item, index) => (
          <ReadTypographyItem
            key={index}
            item={item}
            index={index}
            isSelected={selectedText.some((i) => i.verse === item.verse)}
            onClick={onVerseClick}
          />
        ))}

        <ReadTypographyNavigator
          passageArray={bibleByDateData?.passage || []}
          redirectToBiblePassage={redirectToBiblePassage}
        />
      </View>
    </View>
  )
}

function ErrorComponent({
  invalid,
  resetInvalidBibleChapter,
}: {
  invalid: boolean
  resetInvalidBibleChapter: ReadTypographyProps['resetInvalidBibleChapter']
}) {
  if (invalid) {
    return (
      <View className="mt-4 gap-2 px-4 sm:px-0">
        <Text>
          Kitab (chapter) tidak valid. Silakan tekan tombol reset dibawah ini.
        </Text>

        <Button
          fullWidth
          text="Reset"
          // onClick={() => router.push(`/read/bible?chapter=kej-1`)}
          onClick={resetInvalidBibleChapter}
        />
      </View>
    )
  }

  return (
    <Text className="mt-4 px-4 sm:px-0">
      Terjadi kesalahan saat mengambil data Alkitab. Mohon coba beberapa saat
      lagi.
    </Text>
  )
}
