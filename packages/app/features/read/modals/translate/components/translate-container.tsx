import { Platform, View } from 'react-native'
import { memo } from 'react'
import { useRouter } from 'solito/router'

// Components
import { Header } from '../../../../../components/text'
import TranslateItem from './translate-item'

// Contexts
import { useReadModalsContext } from '../../../contexts/read-modals.context'
import { useReadPassageContext } from '../../../contexts/read-passage.context'

// Utils
import { type BibleTranslationItemType } from '../../../../../utils/constants'

type TranslateContainerProps = {
  language: string
  versions: BibleTranslationItemType['versions']
}

function TranslateContainer({ language, versions }: TranslateContainerProps) {
  const router = useRouter()
  const { setOpenTranslate } = useReadModalsContext()
  const { selectedBibleVersion, setSelectedBibleVersion } =
    useReadPassageContext()

  const onTranslateClick = (selectedBibleVersion: string) => {
    setSelectedBibleVersion(selectedBibleVersion)

    if (Platform.OS === 'web') {
      setOpenTranslate(false)
    } else {
      router.back()
    }
  }

  return (
    <View>
      <Header aria-level={3}>{language}</Header>

      <View className="mt-2 gap-2">
        {versions.map((version) => (
          <TranslateItem
            key={version.key}
            active={selectedBibleVersion === version.key}
            version={version}
            onClick={onTranslateClick}
          />
        ))}
      </View>
    </View>
  )
}

export default memo(TranslateContainer)
