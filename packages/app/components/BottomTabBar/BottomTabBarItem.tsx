import { Platform, TouchableWithoutFeedback } from 'react-native'
import { Text, useSx, View } from 'dripsy'
import { MotiView } from 'moti'

interface BottomTabBarItemProps {
  icon: JSX.Element | undefined
  label: string
  isFocused: boolean
  options?: { tabBarAccessibilityLabel?: string; tabBarTestID?: string }
  onPress: () => void
}

export default function BottomTabBarItem({
  icon,
  label,
  isFocused,
  options,
  onPress,
}: BottomTabBarItemProps) {
  const sx = useSx()

  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options?.tabBarAccessibilityLabel}
      testID={options?.tabBarTestID}
      onPress={onPress}
      style={sx({
        flex: 1,
        height: '100%',
      })}
    >
      <MotiView
        animate={{ width: isFocused ? 150 : 55 }}
        style={sx({
          height: 55,
          flexDirection: 'row',
          borderRadius: 9999,
          alignItems: 'center',
          justifyContent: 'center',
          marginX: 'sm',
          boxShadow: 'float',
          backgroundColor: isFocused ? 'tabActive' : 'tab',
          cursor: 'pointer',
        })}
      >
        {!isFocused ? (
          <View>{icon}</View>
        ) : (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 400 }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View>{icon}</View>
            <Text
              allowFontScaling={false}
              sx={{
                fontWeight: '800',
                marginLeft: 'sm',
                letterSpacing: 1,
                color: isFocused ? 'tabTextActive' : 'tabText',
              }}
              // @ts-ignore
              // https://github.com/nandorojo/dripsy/issues/206
              style={Platform.OS === 'web' ? { fontWeight: 600 } : undefined}
            >
              {label}
            </Text>
          </MotiView>
        )}
      </MotiView>
    </TouchableWithoutFeedback>
  )
}
