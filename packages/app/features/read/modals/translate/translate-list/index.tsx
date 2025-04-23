import { FlatList } from 'react-native'

// Components
import TranslateItemContainer from '../translate-item-container/translate-item-container'

// Types
import type { TranslateListProps } from './types'

export default function TranslateList({
  isLoading,
  availableBibleTranslations,
  handleBackMobile,
}: TranslateListProps) {
  return (
    <FlatList
      data={availableBibleTranslations}
      keyExtractor={(_, index) => `translation-${index}`}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <TranslateItemContainer
          language={item.language}
          versions={item.versions}
          isLoading={isLoading}
          handleBack={handleBackMobile!}
        />
      )}
      contentContainerClassName="pt-4 px-4 pb-28 gap-4"
    />
  )
}
