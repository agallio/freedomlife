import { useMemo } from 'react'
import { Platform, View, useColorScheme } from 'react-native'
import { useRouter } from 'solito/router'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/solid'
import * as Burnt from 'burnt'

// Components
import { Button, IconButton } from '../../../../../components/button'
import { ToasterWebComponent } from '../../../../../components/toaster-container.web'

// Contexts
import { useReadPassageContext } from '../../../contexts/read-passage.context'

// Utils
import { passageData } from '../../../../../utils/constants'
import { cn, getIconColor } from '../../../../../utils/helpers'
import dayjs from '../../../../../utils/dayjs'

const filteredPassageData = passageData.filter((p) => p.passage !== 0)

export default function ReadTypographyNavigator({
  passageArray,
}: {
  passageArray: string[]
}) {
  const colorScheme = useColorScheme()
  const router = useRouter()
  const {
    guided,
    selectedBiblePassage,
    setGuidedSelectedPassage,
    setSelectedBiblePassage,
    updateHighlightedText,
  } = useReadPassageContext()

  // Constants
  const color = getIconColor(colorScheme)

  // Memoized Values
  const guidePassageIndex = useMemo(() => {
    if (guided.enabled) {
      return passageArray.findIndex(
        (passage) => passage === guided.selectedPassage,
      )
    }

    // Make it more than -1, since -1 is reserved by `.findIndex()`.
    return -2
  }, [passageArray, guided.enabled, guided.selectedPassage])

  const showPreviousButton = useMemo(() => {
    if (guided.enabled) {
      return guidePassageIndex > 0
    }

    return selectedBiblePassage !== 'kej-1'
  }, [guidePassageIndex, guided.enabled, selectedBiblePassage])

  const showNextButton = useMemo(() => {
    if (guided.enabled) {
      return guidePassageIndex !== passageArray!.length - 1
    }

    return selectedBiblePassage !== 'why-22'
  }, [passageArray, guidePassageIndex, guided.enabled, selectedBiblePassage])

  // Methods
  const scrollToTop = () => {
    if (Platform.OS === 'web') {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }

  const handleSetSelectedBiblePassage = (newPassage: string) => {
    setSelectedBiblePassage(newPassage)
    if (Platform.OS === 'web') {
      router.push(`/read/bible?chapter=${newPassage}`)
    }
  }

  const onPreviousPassage = () => {
    updateHighlightedText([])

    if (guided.enabled) {
      if (guidePassageIndex <= 0) return

      scrollToTop()
      setGuidedSelectedPassage(passageArray![guidePassageIndex - 1]!)
      return
    }

    const [abbr, chapter] = selectedBiblePassage.split('-')
    const chapterIndex = filteredPassageData.findIndex(
      (passage) => passage.abbr === abbr,
    )

    if (Number(chapter) === 1) {
      const previousPassage = filteredPassageData[chapterIndex - 1]

      if (previousPassage) {
        handleSetSelectedBiblePassage(
          `${previousPassage.abbr}-${previousPassage.passage}`,
        )
      }
    } else {
      const previousChapter = Number(chapter) - 1
      handleSetSelectedBiblePassage(`${abbr}-${previousChapter}`)
    }

    scrollToTop()
  }

  const onNextPassage = () => {
    updateHighlightedText([])

    if (guided.enabled) {
      if (
        guidePassageIndex >= 0 &&
        guidePassageIndex < passageArray!.length - 1
      ) {
        scrollToTop()
        setGuidedSelectedPassage(passageArray![guidePassageIndex + 1])
        return
      }
    }

    const [abbr, chapter] = selectedBiblePassage.split('-')
    const chapterIndex = filteredPassageData.findIndex(
      (passage) => passage.abbr === abbr,
    )
    const maximumChapter = filteredPassageData.find(
      (passage) => passage.abbr === abbr,
    )!.passage

    if (Number(chapter) === maximumChapter) {
      const nextPassage = filteredPassageData[chapterIndex + 1]

      if (nextPassage) {
        handleSetSelectedBiblePassage(`${nextPassage.abbr}-1`)
      }
    } else {
      const nextChapter = Number(chapter) + 1
      handleSetSelectedBiblePassage(`${abbr}-${nextChapter}`)
    }

    scrollToTop()
  }

  const onPassageDateClick = () => {
    const title = 'Sedang Membaca Panduan'
    const message = dayjs(guided.date, 'DD-MM-YYYY').format('DD MMMM YYYY')

    Burnt.toast({
      preset: 'custom',
      duration: 1.5,
      // @ts-ignore
      title:
        Platform.OS === 'web' ? (
          <ToasterWebComponent
            icon={
              <CalendarIcon
                size={20}
                className="text-emerald-900 dark:text-white"
              />
            }
            title={title}
            message={message}
          />
        ) : Platform.OS === 'android' ? (
          `${title}\n${message}`
        ) : (
          title
        ),
      message: Platform.OS === 'ios' ? message : '',
      icon: {
        ios: {
          name: 'calendar',
          color: colorScheme === 'light' ? '#047857' : '#6ee7b7',
        },
      },
    })
  }

  return (
    <View
      className={cn(
        'bottom-[110px] left-0 right-0 flex-row items-center justify-between',
        Platform.OS === 'web' &&
          'pointer-events-none fixed mx-auto max-w-sm px-6 sm:max-w-md sm:px-0',
        Platform.OS !== 'web' &&
          'pointer-events-box-none absolute w-full p-0 md:px-12 lg:px-16',
      )}
    >
      <View>
        {showPreviousButton && (
          <IconButton
            size="sm"
            icon={
              <ChevronLeftIcon
                size={20}
                className={
                  Platform.OS === 'web'
                    ? 'text-emerald-900 dark:text-white'
                    : undefined
                }
                color={Platform.OS !== 'web' ? color : undefined}
              />
            }
            className={cn(
              Platform.OS === 'web' && 'pointer-events-auto',
              Platform.OS !== 'web' && 'ml-6 md:ml-12 lg:ml-16',
            )}
            onClick={onPreviousPassage}
          />
        )}
      </View>

      {guided.enabled && guided.date !== '' && (
        <View
          className={cn(
            Platform.OS === 'web' &&
              'absolute left-1/2 z-[2] -translate-x-1/2 items-center justify-center',
            Platform.OS !== 'web' &&
              'pointer-events-box-none absolute w-full flex-row items-center justify-center',
          )}
        >
          <Button
            variant="passage"
            text={dayjs(guided.date, 'DD-MM-YYYY').format('DD MMM YYYY')}
            icon={
              <View className="mr-1">
                <CalendarIcon
                  size={20}
                  className={
                    Platform.OS === 'web'
                      ? 'text-emerald-900 dark:text-white'
                      : undefined
                  }
                  color={Platform.OS !== 'web' ? color : undefined}
                />
              </View>
            }
            className={cn(Platform.OS === 'web' && 'pointer-events-auto')}
            onClick={onPassageDateClick}
          />
        </View>
      )}

      <View>
        {showNextButton && (
          <IconButton
            size="sm"
            icon={
              <ChevronRightIcon
                size={20}
                className={
                  Platform.OS === 'web'
                    ? 'text-emerald-900 dark:text-white'
                    : undefined
                }
                color={Platform.OS !== 'web' ? color : undefined}
              />
            }
            className={cn(
              Platform.OS === 'web' && 'pointer-events-auto',
              Platform.OS !== 'web' && 'mr-6 md:mr-12 lg:mr-16',
            )}
            onClick={onNextPassage}
          />
        )}
      </View>
    </View>
  )
}
