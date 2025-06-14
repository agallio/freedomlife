import { View } from 'react-native'

// Components
import TranslateItemContainer from '../translate-item-container/translate-item-container'

// Contexts
import { useReadModalsWebContext } from '../../../contexts/read-modals.context.web'

// Types
import type { TranslateListProps } from './types'

export default function TranslateList({
  isLoading,
  availableBibleTranslations,
}: TranslateListProps) {
  const { setOpenTranslate } = useReadModalsWebContext()

  return (
    <View className="gap-4">
      {availableBibleTranslations.map((item) => (
        <TranslateItemContainer
          key={item.language}
          language={item.language}
          versions={item.versions}
          isLoading={isLoading}
          handleBack={() => setOpenTranslate(false)}
        />
      ))}
    </View>
  )
}
