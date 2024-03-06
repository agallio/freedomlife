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

export default function SettingScreenComponent() {
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
        onChange={(event) => {
          setVerseFontSize(
            event.nativeEvent.value.toLowerCase() as ReadSettingsFontSizeType,
          )

          // if (Platform.OS !== 'web') {
          //   setTimeout(() => back(), 400)
          // }
        }}
      />
    </View>
  )
}
