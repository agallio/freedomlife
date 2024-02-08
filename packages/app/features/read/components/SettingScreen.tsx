import { View, Text } from 'dripsy'
import { Platform, useColorScheme } from 'react-native'
import { useRouter } from 'solito/router'
import SegmentedControl from '@react-native-segmented-control/segmented-control'

// Contexts
import {
  useReadSettingsContext,
  FontSize,
} from '../contexts/ReadSettingsContext'

const segmentedValues = ['SM', 'MD', 'LG', 'XL']

export function SettingScreen() {
  const colorScheme = useColorScheme()
  const { back } = useRouter()

  // Contexts
  const { verseFontSize, setVerseFontSize } = useReadSettingsContext()

  return (
    <View
      sx={{
        paddingX: ['md', '2xl'],
        paddingY: Platform.OS === 'web' ? 'md' : 24,
      }}
    >
      <Text
        allowFontScaling={false}
        sx={{
          color: 'text',
          fontWeight: '800',
          marginBottom: 'sm',
        }}
        // @ts-ignore
        // https://github.com/nandorojo/dripsy/issues/206
        style={Platform.OS === 'web' ? { fontWeight: '600' } : undefined}
      >
        Ukuran Teks
      </Text>
      <SegmentedControl
        values={segmentedValues}
        backgroundColor={
          colorScheme === 'light'
            ? '#e4e4e7'
            : Platform.OS === 'web'
              ? '#111827'
              : undefined
        }
        tintColor={
          Platform.OS === 'web'
            ? colorScheme === 'dark'
              ? '#4b5563'
              : undefined
            : undefined
        }
        selectedIndex={segmentedValues.findIndex(
          (value) => value.toLowerCase() === verseFontSize,
        )}
        onChange={(event) => {
          setVerseFontSize(event.nativeEvent.value.toLowerCase() as FontSize)
          if (Platform.OS !== 'web') {
            setTimeout(() => back(), 400)
          }
        }}
      />
    </View>
  )
}
