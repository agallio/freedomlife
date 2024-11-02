import { useMemo } from 'react'
import { Platform, View, useColorScheme } from 'react-native'
import { AnimatePresence, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import {
  HomeIcon,
  BookOpenIcon,
  BookmarkIcon,
} from 'react-native-heroicons/solid'

// Components
import { Text } from '../text'

// Utils
import { cn, getIconColor } from '../../utils/helpers'

type BottomTabItemProps = {
  isFocused: boolean
  label: string
  options?: {
    tabBarAccessibilityLabel?: string
  }
  onPress: () => void
  onLongPress?: () => void
}

export function BottomTabItem({
  isFocused,
  label,
  options,
  onPress,
  onLongPress,
}: BottomTabItemProps) {
  const colorScheme = useColorScheme()

  // Memoized Values
  const pressableAnimate = useMemo(() => {
    return { width: isFocused ? 140 : 55 }
  }, [isFocused])

  const icon = useMemo(() => {
    const color = getIconColor(colorScheme)

    switch (label) {
      case 'Beranda':
        return <HomeIcon size={20} color={color} />
      case 'Baca':
        return <BookOpenIcon size={20} color={color} />
      case 'Panduan':
        return <BookmarkIcon size={20} color={color} />
      default:
        return
    }
  }, [label, colorScheme])

  return (
    <MotiPressable
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityRole={
        // Native-only accessibility prop
        Platform.OS !== 'web' ? 'button' : undefined
      }
      aria-label={
        // Web-only accessibility prop
        Platform.OS === 'web'
          ? options?.tabBarAccessibilityLabel || label
          : undefined
      }
      accessibilityLabel={
        // Native-only accessibility prop
        Platform.OS !== 'web'
          ? options?.tabBarAccessibilityLabel || label
          : undefined
      }
      animate={pressableAnimate}
      transition={{ type: 'spring', damping: 15, mass: 0.4 }}
      onPress={onPress}
      onLongPress={onLongPress}
      containerStyle={{ borderRadius: 9999 }}
    >
      <View
        className={cn(
          'flex h-[55px] flex-row items-center justify-center gap-2 rounded-[9999px] border py-4 shadow-lg',
          {
            // Background & Border colors
            'border-emerald-400 bg-emerald-300 dark:border-emerald-600 dark:bg-emerald-700':
              isFocused,
            'border-gray-200 bg-white dark:border-gray-700 dark:bg-[#2c3440]':
              !isFocused,

            // Shadow colors
            'shadow-gray-600/20 dark:shadow-black/15':
              Platform.OS !== 'android',

            // Hover for desktop
            'transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-600':
              !isFocused && Platform.OS === 'web',
          },
        )}
        style={Platform.OS === 'android' ? { elevation: 3 } : undefined}
      >
        <AnimatePresence initial={false}>
          {isFocused ? (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 400 }}
            >
              <View className="flex flex-row items-center justify-center gap-2">
                <View>{icon}</View>

                <Text
                  customFontWeight="font-medium"
                  className="select-none text-base leading-tight tracking-wider"
                >
                  {label}
                </Text>
              </View>
            </MotiView>
          ) : (
            <View>{icon}</View>
          )}
        </AnimatePresence>
      </View>
    </MotiPressable>
  )
}
