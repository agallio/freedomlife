import { Platform, View, useColorScheme } from 'react-native'
import SegmentedControl from '@react-native-segmented-control/segmented-control'

// Components
import { Text } from '../../../../components/text'

// Contexts
import {
  useReadSettingsContext,
  type ReadSettingsFontSizeType,
} from '../../contexts/read-settings.context'

const segmentedValues = ['SM', 'MD', 'LG', 'XL']

type SettingScreenComponentProps = {
  handleBackWeb?: () => void
}

export default function SettingScreenComponent({
  handleBackWeb,
}: SettingScreenComponentProps) {
  const colorScheme = useColorScheme()
  const { rawVerseFontSize, setVerseFontSize } = useReadSettingsContext()

  return (
    <View>
      <Text className="mb-2">Atur Ukuran Teks</Text>

      <SegmentedControl
        values={segmentedValues}
        backgroundColor={
          colorScheme === 'light'
            ? '#e4e4e7'
            : Platform.OS === 'web' || Platform.OS === 'android'
              ? '#111827'
              : undefined
        }
        tintColor={
          Platform.OS === 'web' || Platform.OS === 'android'
            ? colorScheme === 'dark'
              ? '#4b5563'
              : undefined
            : undefined
        }
        selectedIndex={segmentedValues.findIndex(
          (value) => value.toLowerCase() === rawVerseFontSize,
        )}
        onValueChange={(value) => {
          setVerseFontSize(value.toLowerCase() as ReadSettingsFontSizeType)

          if (Platform.OS !== 'web') {
            setTimeout(() => handleBackWeb?.(), 400)
          }
        }}
      />
    </View>
  )
}
