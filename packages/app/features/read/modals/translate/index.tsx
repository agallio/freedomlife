import { View } from 'react-native'

// Components
import TranslateContainer, {
  type TranslateContainerProps,
} from './translate-container'

export default function TranslateModal({
  handleBack,
}: TranslateContainerProps) {
  return (
    <View className="p-4">
      <TranslateContainer handleBack={handleBack} />
    </View>
  )
}
