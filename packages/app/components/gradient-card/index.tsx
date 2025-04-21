import { View, useColorScheme } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { fromCSS } from '@bacons/css-to-expo-linear-gradient'

// Utils
import { cn } from '../../utils/helpers'

// Types
import type { CardProps } from '../card'

type GradientCardProps = CardProps & {
  variants: 'passage' | 'new-user'
  className?: string
}

const gradientColors = {
  passage: {
    light: 'linear-gradient(45deg, #34d399 0%, #a7f3d0 100%)',
    dark: 'linear-gradient(45deg, #0a845c 0%, #0098b7 100%)',
  },
  'new-user': {
    light: 'linear-gradient(90deg,#a855f7,#6366f1,#3b82f6)',
    dark: 'linear-gradient(90deg,#a855f7,#6366f1,#3b82f6)',
  },
}

export default function GradientCard({
  title,
  footer,
  variants,
  className,
  children,
}: GradientCardProps) {
  const colorScheme = useColorScheme()

  return (
    <View
      className={cn(
        'flex flex-col justify-center rounded-lg bg-white dark:bg-gray-800',
        className,
      )}
    >
      {/* @ts-ignore: typing issue (https://github.com/EvanBacon/css-to-expo-linear-gradient/issues/9) */}
      <LinearGradient
        {...fromCSS(
          colorScheme === 'light'
            ? gradientColors[variants].light
            : gradientColors[variants].dark,
        )}
        style={{ borderRadius: 8 }}
      >
        {title && (
          <View className="flex w-full flex-col rounded-t-lg bg-white/20 dark:bg-black/10">
            {title}
          </View>
        )}

        {children}

        {footer && (
          <View className="flex w-full flex-col rounded-b-lg bg-white/20 dark:bg-black/10">
            {footer}
          </View>
        )}
      </LinearGradient>
    </View>
  )
}
