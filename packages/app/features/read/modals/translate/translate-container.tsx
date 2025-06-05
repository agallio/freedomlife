import { useMemo } from 'react'

// Components
import TranslateList from './translate-list'

// Contexts
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../contexts/read-passage.context'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from '../../../../hooks/use-guide-query'

// Constants
import { bibleTranslations, tsiAbbrs } from '../../../../utils/constants'

// Utils
import { filterTranslationsWithLookupSet } from './utils'
import { useFeatureFlagContext } from '../../../../providers/feature-flags'

export type TranslateContainerProps = { handleBackMobile?: () => void }

export default function TranslateContainer({
  handleBackMobile,
}: TranslateContainerProps) {
  const { guidedEnabled, selectedBiblePassage } =
    useReadPassagePersistedContext()
  const guided = useReadPassageGeneralContext((state) => state.guided)
  const { data: tsiFlagData, isLoading: tsiFlagLoading } =
    useFeatureFlagContext('feature_tsi_translation')

  // Queries
  const { data: guideTodayData, isLoading: guideTodayLoading } =
    useGuideTodayQuery()
  const { data: guideByDateData, isLoading: guideByDateLoading } =
    useGuideByDateQuery({
      date: guided.date,
      enabled: guidedEnabled && guided.date !== '',
    })

  // Memoized Values
  const isLoading = useMemo(
    () => tsiFlagLoading || guideTodayLoading || guideByDateLoading,
    [tsiFlagLoading, guideTodayLoading, guideByDateLoading],
  )

  const availableBibleTranslations = useMemo(() => {
    // Handle if TSI feature flag enabled.
    const tsiTranslationEnabled = tsiFlagData?.enabled
    if (tsiTranslationEnabled) {
      // Handle in guided mode
      // 1. If inside custom date, use available bible translations from custom date data
      // 2. If not, use available bible translations from today's data
      if (guidedEnabled) {
        if (guided.date && guideByDateData) {
          return filterTranslationsWithLookupSet(
            guideByDateData.available_bible_translations,
          )
        }

        if (guided.date === '' && guideTodayData) {
          return filterTranslationsWithLookupSet(
            guideTodayData.available_bible_translations,
          )
        }
      }

      // Handle outside guided mode.
      // Check if the TSI is available on the selected bible
      // 1. If not available, return without TSI translation
      // 2. If available, return all the data
      const selectedBibleAbbr = selectedBiblePassage.split('-')[0]
      const isTSIAvailable =
        tsiAbbrs.includes(selectedBibleAbbr) && tsiTranslationEnabled

      if (!isTSIAvailable) {
        return bibleTranslations.map((item) => ({
          ...item,
          versions: item.versions.filter((version) => version.key !== 'tsi'),
        }))
      }

      return bibleTranslations
    }

    // If TSI feature flag disabled,
    // remove TSI from bible translations data.
    return bibleTranslations.map((item) => ({
      ...item,
      versions: item.versions.filter((version) => version.key !== 'tsi'),
    }))
  }, [
    guidedEnabled,
    guided.date,
    guideTodayData,
    guideByDateData,
    selectedBiblePassage,
    tsiFlagData?.enabled,
  ])

  return (
    <TranslateList
      isLoading={isLoading}
      availableBibleTranslations={availableBibleTranslations}
      handleBackMobile={handleBackMobile}
    />
  )
}
