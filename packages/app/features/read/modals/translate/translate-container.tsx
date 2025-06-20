import { useMemo } from 'react'

// Components
import SharedTranslateList from '../../../[shared]/shared-translate-list/index'
import TranslateItemDownloadButton from './translate-item-download-button'

// Contexts
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../contexts/read-passage.context'

// Providers
import {
  EVENT_NAMES,
  useEventTrackingContext,
} from '../../../../providers/event-tracking'

// Queries
import {
  useGuideByDateQuery,
  useGuideTodayQuery,
} from '../../../../hooks/use-guide-query'

// Constants
import { bibleTranslations, tsiAbbrs } from '../../../../utils/constants'

// Utils
import { filterTranslationsWithLookupSet } from './utils'

export type TranslateContainerProps = { handleBack: () => void }

export default function TranslateContainer({
  handleBack,
}: TranslateContainerProps) {
  const { captureEvent } = useEventTrackingContext()
  const { guidedEnabled, selectedBiblePassage } =
    useReadPassagePersistedContext()
  const guided = useReadPassageGeneralContext((state) => state.guided)
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const { setSelectedBibleVersion } = useReadPassageGeneralContext(
    (state) => state.actions,
  )

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
    () => guideTodayLoading || guideByDateLoading,
    [guideTodayLoading, guideByDateLoading],
  )

  const availableBibleTranslations = useMemo(() => {
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
    const isTSIAvailable = tsiAbbrs.includes(selectedBibleAbbr)

    if (!isTSIAvailable) {
      return bibleTranslations.map((item) => ({
        ...item,
        versions: item.versions.filter((version) => version.key !== 'tsi'),
      }))
    }

    return bibleTranslations
  }, [
    guidedEnabled,
    guided.date,
    guideTodayData,
    guideByDateData,
    selectedBiblePassage,
  ])

  // Methods
  const handleVersionClick = (selectedBibleVersion: string) => {
    captureEvent?.(EVENT_NAMES.SET_BIBLE_VERSION, {
      bible_version: selectedBibleVersion,
    })

    setSelectedBibleVersion(selectedBibleVersion)
    handleBack()
  }

  return (
    <SharedTranslateList
      isLoading={isLoading}
      bibleTranslations={availableBibleTranslations}
      selectedBibleVersion={selectedBibleVersion}
      handleVersionClick={handleVersionClick}
      DownloadButtonComponent={
        !guidedEnabled ? TranslateItemDownloadButton : undefined
      }
    />
  )
}
