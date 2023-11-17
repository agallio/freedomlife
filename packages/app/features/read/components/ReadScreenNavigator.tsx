import React, { useMemo } from 'react'
import { Platform, TouchableOpacity, useColorScheme } from 'react-native'
import { View, Text, useSx } from 'dripsy'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from 'react-native-heroicons/solid'
import * as Burnt from 'burnt'

// Contexts
import { useReadPassageContext } from '../contexts/ReadPassageContext'

// Utils
import { passageData } from 'app/utils/constants'
import dayjs from 'app/utils/dayjs'

export default function ReadScreenNavigator({
  passageArray,
}: {
  passageArray?: string[]
}) {
  const sx = useSx()
  const colorScheme = useColorScheme()

  // Contexts
  const {
    inGuide,
    passage,
    guidePassage,
    guideDate,
    setPassage,
    setGuidePassage,
    setHighlightedText,
  } = useReadPassageContext()

  // Variables
  const filteredPassageData = passageData.filter((p) => p.passage !== 0)

  // Memoized Variables
  const guidePassageIndex = useMemo(
    () => (inGuide ? passageArray?.findIndex((p) => p === guidePassage)! : -77),
    [passageArray, inGuide, guidePassage],
  )
  const showPrevButton = useMemo(
    () => (inGuide ? guidePassageIndex !== 0 : passage !== 'kej-1'),
    [inGuide, passage, guidePassageIndex],
  )
  const showNextButton = useMemo(
    () =>
      inGuide
        ? guidePassageIndex !== passageArray!.length - 1
        : passage !== 'why-22',
    [passageArray, inGuide, passage, guidePassageIndex],
  )

  // Methods
  const prevPassage = () => {
    setHighlightedText([])

    if (inGuide) {
      if (guidePassageIndex === -1 || guidePassageIndex === 0) return
      setGuidePassage(passageArray![guidePassageIndex - 1]!)
      return
    }

    const [abbr, chapter] = passage.split('-')
    const chapterIndex = filteredPassageData.findIndex((p) => p.abbr === abbr)
    if (Number(chapter) === 1) {
      const prevPassage = filteredPassageData[chapterIndex - 1]
      if (prevPassage) {
        setPassage(`${prevPassage.abbr}-${prevPassage.passage}`)
      }
    } else {
      const prevChapter = Number(chapter) - 1
      setPassage(`${abbr}-${prevChapter}`)
    }
  }

  const nextPassage = () => {
    setHighlightedText([])

    if (inGuide) {
      if (
        guidePassageIndex !== -1 &&
        guidePassageIndex < passageArray!.length - 1
      ) {
        setGuidePassage(passageArray![guidePassageIndex + 1]!)
      }
      return
    }

    const [abbr, chapter] = passage.split('-')
    const chapterIndex = filteredPassageData.findIndex((p) => p.abbr === abbr)
    const maxChapter = filteredPassageData.find((p) => p.abbr === abbr)!.passage
    if (Number(chapter) === maxChapter) {
      const nextPassage = filteredPassageData[chapterIndex + 1]
      if (nextPassage) {
        setPassage(`${nextPassage.abbr}-1`)
      }
    } else {
      const nextChapter = Number(chapter) + 1
      setPassage(`${abbr}-${nextChapter}`)
    }
  }

  return (
    <View
      pointerEvents="box-none"
      sx={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 110,
        left: 0,
        right: 0,
        marginX: ['md', '2xl'],
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
      }}
    >
      <View>
        {showPrevButton && (
          <TouchableOpacity
            style={sx({
              width: 50,
              height: 50,
              borderRadius: 9999,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'tab',
              boxShadow: 'float',
            })}
            onPress={prevPassage}
          >
            <ChevronLeftIcon size={20} style={sx({ color: 'tabText' })} />
          </TouchableOpacity>
        )}
      </View>

      {guideDate ? (
        <TouchableOpacity
          style={sx({
            position: 'absolute',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            zIndex: -1,
          })}
          onPress={() =>
            Burnt.toast({
              preset: 'custom',
              title: 'Sedang Membaca Panduan',
              message: dayjs(guideDate, 'DD-MM-YYYY').format('DD MMMM YYYY'),
              duration: 1.5,
              icon: {
                ios: {
                  name: 'calendar',
                  color: colorScheme === 'light' ? '#047857' : '#6ee7b7',
                },
              },
            })
          }
        >
          <View
            sx={{
              boxShadow: 'float',
              backgroundColor: 'tabActive',
              width: '50%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
              borderRadius: 999,
            }}
          >
            <CalendarIcon size={20} style={sx({ color: 'tabTextActive' })} />
            <Text
              sx={{
                marginLeft: 8,
                color: 'tabTextActive',
                fontWeight: '600',
              }}
            >
              {dayjs(guideDate, 'DD-MM-YYYY').format('DD MMM YYYY')}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}

      <View>
        {showNextButton && (
          <TouchableOpacity
            style={sx({
              width: 50,
              height: 50,
              borderRadius: 9999,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'tab',
              boxShadow: 'float',
            })}
            onPress={nextPassage}
          >
            <ChevronRightIcon size={20} style={sx({ color: 'tabText' })} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
