import { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'

// Components
import ReadNavbarLeft from './item-left'
import ReadNavbarTitle from './item-title'
import ReadNavbarRight from './item-right'

// Contexts
import { useReadPassageContext } from '../../../contexts/read-passage.context'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from '../../../../../hooks/use-guide-query'

// Utils
import { passageData } from '../../../../../utils/constants'

export default function ReadNavbarContainer() {
  const { guided, selectedBibleVersion, selectedBiblePassage } =
    useReadPassageContext()

  // States
  const [mounted, setMounted] = useState(false)

  // Queries
  const { data: guideTodayData, isLoading: guideTodayLoading } =
    useGuideTodayQuery()
  const { data: guideByDateData, isLoading: guideByDateLoading } =
    useGuideByDateQuery({
      date: guided.date,
      enabled: guided.enabled && guided.date !== '',
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
    if (guided.enabled) {
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
    guided,
    selectedBiblePassage,
    selectedBibleVersion,
    guideTodayData,
    guideByDateData,
    isGuidedDataLoading,
  ])

  const cleanPassageName = useMemo(() => {
    // Make a clean passage name that will be used when copying verses.
    // Example:
    // - `Kejadian 1 (BIS)` --> `Kejadian 1`
    // - `Matius 119:89-110` --> `Matius 119`
    const versionStripped = passageName.replace(/\((.*)\)/g, '')
    const verseSplitted = versionStripped.split(':')

    if (verseSplitted.length > 0) {
      const trimmedVerseSplitted = verseSplitted[0]?.trim() || ''
      return trimmedVerseSplitted as string
    }

    return versionStripped
  }, [passageName])

  // Effects
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <View>
        <ReadNavbarLeft isLoading={isGuidedDataLoading} />
      </View>

      <View>
        <ReadNavbarTitle passageName={passageName} />
      </View>

      <View>
        <ReadNavbarRight cleanPassageName={cleanPassageName} />
      </View>
    </>
  )
}
