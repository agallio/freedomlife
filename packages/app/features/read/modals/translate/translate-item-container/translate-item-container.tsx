import { memo } from 'react'
import { View } from 'react-native'

// Components
import { Header } from '../../../../../components/text'
import TranslateItem from './translate-item'

// Contexts
import { useReadPassageContext } from '../../../contexts/read-passage.context'

// Utils
import { type BibleTranslationItemType } from '../../../../../utils/constants'

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
  const { selectedBibleVersion, setSelectedBibleVersion } =
    useReadPassageContext()

  const onTranslateClick = (selectedBibleVersion: string) => {
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
