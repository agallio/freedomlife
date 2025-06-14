import { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'

// Components
import ReadNavbarLeft from './item-left'
import ReadNavbarTitle from './item-title'
import ReadNavbarRight from './item-right'

// Contexts
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../../contexts/read-passage.context'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from '../../../../../hooks/use-guide-query'

// Utils
import { passageData } from '../../../../../utils/constants'

// Types
import type { ReadNavbarProps } from '../types'

export default function ReadNavbarContainer({
  redirectToPassageScreen,
  redirectToTranslateScreen,
}: ReadNavbarProps) {
  const { guidedEnabled, selectedBiblePassage } =
    useReadPassagePersistedContext()
  const guided = useReadPassageGeneralContext((state) => state.guided)
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )

  // States
  const [mounted, setMounted] = useState(false)

  // Queries
  const { data: guideTodayData, isLoading: guideTodayLoading } =
    useGuideTodayQuery()
  const { data: guideByDateData, isLoading: guideByDateLoading } =
    useGuideByDateQuery({
      date: guided.date,
      enabled: guidedEnabled && guided.date !== '',
    })

  // Memoized Values
  const isGuidedDataLoading = useMemo(
    () => guideTodayLoading || guideByDateLoading || !guided.selectedPassage,
    [guideTodayLoading, guideByDateLoading, guided.selectedPassage],
  )

  const passageName = useMemo(() => {
    const selectedBibleVersionText =
      selectedBibleVersion !== 'tb'
        ? ` (${selectedBibleVersion.toUpperCase()})`
        : ''

    if (!mounted) return 'Memuat'

    // Handle when guided
    if (guidedEnabled) {
      if (isGuidedDataLoading) {
        return 'Memuat'
      }

      // Handle guided with custom date
      if (guided.date !== '' && guideByDateData) {
        const guidedDateData = guideByDateData.guide_bible_data?.find(
          (passage) => passage.value === guided.selectedPassage,
        )

        return guidedDateData
          ? `${guidedDateData.title}${selectedBibleVersionText}`
          : ''
      }

      // Handle guided with today's date
      if (guideTodayData) {
        const guidedTodayData = guideTodayData.guide_bible_data?.find(
          (passage) => passage.value === guided.selectedPassage,
        )

        return guidedTodayData
          ? `${guidedTodayData.title}${selectedBibleVersionText}`
          : ''
      }
    }

    // Handle when not guided - basic bible reading
    const [abbr, chapter] = selectedBiblePassage.split('-')
    const chapterName = passageData.find(
      (passage) => passage.abbr === abbr,
    )?.name

    return chapterName
      ? `${chapterName} ${chapter}${selectedBibleVersionText}`
      : 'Error'
  }, [
    mounted,
    guidedEnabled,
    guided,
    selectedBiblePassage,
    selectedBibleVersion,
    guideTodayData,
    guideByDateData,
    isGuidedDataLoading,
  ])

  // Effects
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <View>
        <ReadNavbarLeft
          isLoading={isGuidedDataLoading}
          redirectToTranslateScreen={redirectToTranslateScreen}
        />
      </View>

      <View>
        <ReadNavbarTitle
          passageName={passageName}
          redirectToPassageScreen={redirectToPassageScreen}
        />
      </View>

      <View>
        <ReadNavbarRight />
      </View>
    </>
  )
}
