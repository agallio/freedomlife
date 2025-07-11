import { useMemo } from 'react'
import { Platform, View, useColorScheme } from 'react-native'
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
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../../contexts/read-passage.context'

// Utils
import { passageData, tsiAbbrs } from '../../../../../utils/constants'
import { cn, getIconColor } from '../../../../../utils/helpers'
import dayjs from '../../../../../utils/dayjs'

// Types
import type { ReadTypographyProps } from '../types'

const filteredPassageData = passageData.filter((p) => p.passage !== 0)
const tsiPassageData = passageData.filter(
  (p) => p.passage !== 0 && new Set(tsiAbbrs).has(p.abbr),
)

export default function ReadTypographyNavigator({
  passageArray,
  redirectToBiblePassage,
}: {
  passageArray: string[]
  redirectToBiblePassage?: ReadTypographyProps['redirectToBiblePassage']
}) {
  const colorScheme = useColorScheme()
  const { guidedEnabled, selectedBiblePassage, setSelectedBiblePassage } =
    useReadPassagePersistedContext()
  const guided = useReadPassageGeneralContext((state) => state.guided)
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const { setGuidedSelectedPassage, updateSelectedText } =
    useReadPassageGeneralContext((state) => state.actions)

  // Constants
  const color = getIconColor(colorScheme)

  // Memoized Values
  const guidePassageIndex = useMemo(() => {
    if (guidedEnabled) {
      return passageArray.findIndex(
        (passage) => passage === guided.selectedOrder,
      )
    }

    // Make it more than -1, since -1 is reserved by `.findIndex()`.
    return -2
  }, [passageArray, guidedEnabled, guided.selectedOrder])

  const showPreviousButton = useMemo(() => {
    if (guidedEnabled) {
      return guidePassageIndex > 0
    }

    return selectedBiblePassage !== 'kej-1'
  }, [guidePassageIndex, guidedEnabled, selectedBiblePassage])

  const showNextButton = useMemo(() => {
    if (guidedEnabled) {
      return guidePassageIndex !== passageArray!.length - 1
    }

    return selectedBiblePassage !== 'why-22'
  }, [passageArray, guidePassageIndex, guidedEnabled, selectedBiblePassage])

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
      redirectToBiblePassage?.(newPassage)
    }
  }

  const onPreviousPassage = () => {
    updateSelectedText([])

    if (guidedEnabled) {
      if (guidePassageIndex <= 0) return

      scrollToTop()
      setGuidedSelectedPassage(passageArray![guidePassageIndex - 1]!)
      return
    }

    const [abbr, chapter] = selectedBiblePassage.split('-')

    if (Number(chapter) === 1) {
      const chapterIndex =
        selectedBibleVersion === 'tsi'
          ? tsiPassageData.findIndex((passage) => passage.abbr === abbr)
          : filteredPassageData.findIndex((passage) => passage.abbr === abbr)
      const previousPassage =
        selectedBibleVersion === 'tsi'
          ? tsiPassageData[chapterIndex - 1]
          : filteredPassageData[chapterIndex - 1]

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
    updateSelectedText([])

    if (guidedEnabled) {
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
    const maximumChapter = filteredPassageData.find(
      (passage) => passage.abbr === abbr,
    )!.passage

    if (Number(chapter) === maximumChapter) {
      const chapterIndex =
        selectedBibleVersion === 'tsi'
          ? tsiPassageData.findIndex((passage) => passage.abbr === abbr)
          : filteredPassageData.findIndex((passage) => passage.abbr === abbr)
      const nextPassage =
        selectedBibleVersion === 'tsi'
          ? tsiPassageData[chapterIndex + 1]
          : filteredPassageData[chapterIndex + 1]

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
        'bottom-[110px]',
        Platform.OS === 'web' &&
          'pointer-events-none fixed left-0 right-0 mx-auto max-w-sm flex-row items-center justify-between px-6 sm:max-w-md sm:px-0',
        // Platform.OS !== 'web' &&
        //   'pointer-events-box-none absolute w-full p-0 md:px-12 lg:px-16',
        Platform.OS !== 'web' &&
          'pointer-events-box-none absolute flex w-full flex-row items-center justify-between px-6 min-[744px]:px-32 md:px-80',
      )}
    >
      <View className={Platform.OS !== 'web' ? 'h-[42px] w-[44px]' : undefined}>
        {showPreviousButton && (
          <IconButton
            size="sm"
            variant="navigator"
            icon={
              <ChevronLeftIcon
                size={24}
                className={
                  Platform.OS === 'web'
                    ? 'text-emerald-900 dark:text-white'
                    : undefined
                }
                color={Platform.OS !== 'web' ? color : undefined}
              />
            }
            className={cn(Platform.OS === 'web' && 'pointer-events-auto')}
            onClick={onPreviousPassage}
          />
        )}
      </View>

      {guidedEnabled && guided.date !== '' && (
        <View
          className={cn(
            Platform.OS === 'web' &&
              'absolute left-1/2 z-[2] -translate-x-1/2 items-center justify-center',
            Platform.OS !== 'web' &&
              'pointer-events-box-none flex-row items-center justify-center',
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

      <View className={Platform.OS !== 'web' ? 'h-[42px] w-[44px]' : undefined}>
        {showNextButton && (
          <IconButton
            size="sm"
            variant="navigator"
            icon={
              <ChevronRightIcon
                size={24}
                className={
                  Platform.OS === 'web'
                    ? 'text-emerald-900 dark:text-white'
                    : undefined
                }
                color={Platform.OS !== 'web' ? color : undefined}
              />
            }
            className={cn(Platform.OS === 'web' && 'pointer-events-auto')}
            onClick={onNextPassage}
          />
        )}
      </View>
    </View>
  )
}
