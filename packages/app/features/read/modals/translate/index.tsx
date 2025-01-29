import { useMemo } from 'react'
import { FlatList } from 'react-native'

// Components
import TranslateContainer from './components/translate-container'

// Contexts
import { useReadPassageContext } from '../../contexts/read-passage.context'

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

export default function TranslateScreenComponent() {
  const { guided, selectedBiblePassage } = useReadPassageContext()
  const { data: tsiFlagData, isLoading: tsiFlagLoading } =
    useFeatureFlagContext('feature_tsi_translation')

  // Queries
  const { data: guideTodayData, isLoading: guideTodayLoading } =
    useGuideTodayQuery()
  const { data: guideByDateData, isLoading: guideByDateLoading } =
    useGuideByDateQuery({
      date: guided.date,
      enabled: guided.enabled && guided.date !== '',
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
      if (guided.enabled) {
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
    guided.enabled,
    guided.date,
    guideTodayData,
    guideByDateData,
    selectedBiblePassage,
    tsiFlagData?.enabled,
  ])

  return (
    <FlatList
      data={availableBibleTranslations}
      keyExtractor={(_, index) => `translation-${index}`}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <TranslateContainer
          language={item.language}
          versions={item.versions}
          isLoading={isLoading}
        />
      )}
      contentContainerClassName="pt-4 px-4 pb-28 gap-4"
    />
  )
}
