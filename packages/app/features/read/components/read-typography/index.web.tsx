import { useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { useRouter } from 'solito/router'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Components
import { Text } from '../../../../components/text'
import { Button } from '../../../../components/button'
import Skeleton from '../../../../components/skeleton'
import ReadTypographyItem from './components/read-typography-item'
import ReadTypographyNavigator from './components/read-typography-navigator'

// Contexts
import { useReadPassageContext } from '../../contexts/read-passage.context'
import { useReadLocalDatabaseWeb } from '../../local-databases/web/index.web'

// Queries
import {
  useBibleByDateQuery,
  useBibleByPassageQuery,
} from '../../../../hooks/use-bible-query'

// Utils
import { cn } from '../../../../utils/helpers'
import dayjs from '../../../../utils/dayjs'

export default function ReadTypography() {
  const {
    guided,
    selectedBiblePassage,
    selectedBibleVersion,
    highlightedText,
    insertHighlightedText,
    updateHighlightedText,
  } = useReadPassageContext()
  const { downloadedData, getBibleData } = useReadLocalDatabaseWeb()

  // Refs
  const bibleTypographyRef = useRef<HTMLDivElement | undefined>()

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
      isDownloaded: downloadedData[selectedBibleVersion],
      getBibleData,
    },
  })

  // Constants
  const isLoading = guided.enabled ? bibleByDateLoading : bibleByPassageLoading
  const isError = guided.enabled
    ? bibleByDateError
    : bibleByPassageError || selectedBiblePassage === 'invalid'

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
  const onVerseClick = (content: string, verse: number) => {
    if (highlightedText.find((i) => i.verse === verse)) {
      updateHighlightedText(highlightedText.filter((i) => i.verse !== verse))
    } else {
      insertHighlightedText({ verse, content })
    }
  }

  const handleScroll = async () => {
    if (
      !guided.selectedPassage.includes('pb') &&
      !guided.selectedPassage.includes('in')
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

  return (
    <View className="pb-40">
      {isError ? (
        <ErrorComponent invalid={selectedBiblePassage === 'invalid'} />
      ) : isLoading ? (
        [...Array(15).keys()].map((i) => (
          <View
            key={i}
            className={cn(i === 0 && 'my-4 px-12', i > 0 && 'my-1.5 px-4')}
          >
            <Skeleton width="100%" height={i === 0 ? 28 : 20} />
          </View>
        ))
      ) : (
        <View ref={bibleTypographyRef as any} className="sm:gap-1">
          {versesData.map((item, index) => (
            <ReadTypographyItem
              key={index}
              item={item}
              index={index}
              isHighlighted={Boolean(
                highlightedText.find((i) => i.verse === item.verse),
              )}
              onClick={onVerseClick}
            />
          ))}

          <ReadTypographyNavigator passageArray={bibleByDateData?.passage} />
        </View>
      )}
    </View>
  )
}

function ErrorComponent({ invalid }: { invalid: boolean }) {
  const router = useRouter()

  if (invalid) {
    return (
      <View className="mt-4 gap-2 px-4 sm:px-0">
        <Text>
          Kitab (chapter) tidak valid. Silakan tekan tombol reset dibawah ini.
        </Text>

        <Button
          fullWidth
          text="Reset"
          onClick={() => router.push(`/read/bible?chapter=kej-1`)}
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
