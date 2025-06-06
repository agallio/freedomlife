import { memo } from 'react'
import { View } from 'react-native'

// Components
import { Header } from '../../../../../components/text'
import TranslateItem from './translate-item'

// Contexts
import { useReadPassageGeneralContext } from '../../../contexts/read-passage.context'

// Utils
import { type BibleTranslationItemType } from '../../../../../utils/constants'
import {
  EVENT_NAMES,
  useEventTrackingContext,
} from '../../../../../providers/event-tracking'

type TranslateItemContainerProps = {
  language: string
  versions: BibleTranslationItemType['versions']
  isLoading?: boolean
  handleBack: () => void
}

function TranslateItemContainer({
  language,
  versions,
  isLoading,
  handleBack,
}: TranslateItemContainerProps) {
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const { setSelectedBibleVersion } = useReadPassageGeneralContext(
    (state) => state.actions,
  )
  const { captureEvent } = useEventTrackingContext()

  const onTranslateClick = (selectedBibleVersion: string) => {
    captureEvent?.(EVENT_NAMES.SET_BIBLE_VERSION, {
      bible_version: selectedBibleVersion,
    })

    setSelectedBibleVersion(selectedBibleVersion)
    handleBack()
  }

  return (
    <View>
      <Header aria-level={3}>{language}</Header>

      <View className="mt-2 gap-2">
        {versions.map((version) => (
          <TranslateItem
            key={version.key}
            isLoading={isLoading}
            active={selectedBibleVersion === version.key}
            version={version}
            onClick={onTranslateClick}
          />
        ))}
      </View>
    </View>
  )
}

export default memo(TranslateItemContainer)
