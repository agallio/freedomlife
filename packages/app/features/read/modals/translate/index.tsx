import { FlatList } from 'react-native'

// Components
import TranslateContainer from './components/translate-container'

// Constants
import { bibleTranslations } from '../../../../utils/constants'

export default function TranslateScreenComponent() {
  return (
    <FlatList
      data={bibleTranslations}
      keyExtractor={(_, index) => `translation-${index}`}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <TranslateContainer language={item.language} versions={item.versions} />
      )}
      contentContainerClassName="pt-4 px-4 pb-28 gap-4"
    />
  )
}
