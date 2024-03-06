import { type ReactNode, type PropsWithChildren } from 'react'
import { Platform, View } from 'react-native'

// Utils
import { cn } from '../utils/helpers'

export type CardProps = PropsWithChildren<{
  variant?: 'base' | 'active'
  title?: ReactNode
  footer?: ReactNode
}>

const getShadow = () => {
  if (Platform.OS === 'android') {
    return undefined
  }

  return 'shadow-sm shadow-gray-300 dark:shadow-gray-900'
}

const getShadowActive = () => {
  if (Platform.OS === 'android') {
    return 'shadow'
  }

  return 'shadow-sm shadow-gray-300 dark:shadow-gray-900'
}

export default function Card({
  variant = 'base',
  title,
  footer,
  children,
}: CardProps) {
  return (
    <View
      className={cn(
        'flex flex-col justify-center rounded-lg',
        variant === 'base' && `bg-white dark:bg-gray-700 ${getShadow()}`,
        variant === 'active' &&
          `bg-emerald-300 dark:bg-emerald-800 ${getShadowActive()}`,
      )}
      style={Platform.OS === 'android' ? { elevation: 2 } : undefined}
    >
      {title && (
        <View
          className={cn(
            'flex w-full flex-col border-b',
            variant === 'base' && 'border-gray-200 dark:border-gray-600',
            variant === 'active' &&
              'rounded-t-lg border-emerald-400 bg-emerald-400 dark:border-emerald-700 dark:bg-emerald-700',
          )}
        >
          {title}
        </View>
      )}

      {children}

      {footer && (
        <View
          className={cn(
            'flex w-full flex-col border-t',
            variant === 'base' && 'border-gray-200 dark:border-gray-600',
            variant === 'active' &&
              'rounded-b-lg border-emerald-400 bg-emerald-400 dark:border-emerald-700 dark:bg-emerald-700',
          )}
        >
          {footer}
        </View>
      )}
    </View>
  )
}
