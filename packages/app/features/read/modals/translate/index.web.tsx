import { useMemo } from 'react'

// Components
import { View } from 'react-native'
import Drawer from '../../../../components/drawer'
import TranslateContainer from './components/translate-container'

// Contexts
import { useReadModalsContext } from '../../contexts/read-modals.context'
import { useFeatureFlagContext } from '../../../../providers/feature-flags'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from '../../../../hooks/use-guide-query'

// Utils
import { bibleTranslations, tsiAbbrs } from '../../../../utils/constants'
import { useReadPassageContext } from '../../contexts/read-passage.context'
import { filterTranslationsWithLookupSet } from './utils'

export default function TranslateScreen() {
  const { openTranslate, setOpenTranslate } = useReadModalsContext()
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
    () => guideTodayLoading || guideByDateLoading || tsiFlagLoading,
    [guideTodayLoading, guideByDateLoading, tsiFlagLoading],
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
    <Drawer
      open={openTranslate}
      title="Pilih Terjemahan"
      setOpen={setOpenTranslate}
    >
      <View className="gap-4">
        {availableBibleTranslations.map((item) => (
          <TranslateContainer
            key={item.language}
            language={item.language}
            versions={item.versions}
            isLoading={isLoading}
          />
        ))}
      </View>
    </Drawer>
  )
}
