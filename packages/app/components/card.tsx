import {
  type ReactNode,
  type PropsWithChildren,
  type ComponentProps,
  useMemo,
} from 'react'
import { Platform, View, Pressable } from 'react-native'

// Utils
import { cn } from '../utils/helpers'

export type CardProps = PropsWithChildren<{
  variant?: 'base' | 'active'
  title?: ReactNode
  footer?: ReactNode
}>

type PressableCardProps = PropsWithChildren<
  Pick<CardProps, 'title' | 'footer'> & {
    onPress?: ComponentProps<typeof Pressable>['onPress']
  }
>

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

type CardBaseProps = PropsWithChildren<{
  variant?: 'base' | 'active'
  title?: ReactNode
  footer?: ReactNode
  className?: string
  style?: any
  backgroundClassName?: string
}>

function CardBase({
  variant = 'base',
  title,
  footer,
  children,
  className,
  style,
  backgroundClassName,
}: CardBaseProps) {
  const getBackgroundClasses = useMemo(() => {
    if (backgroundClassName) {
      return backgroundClassName
    }

    if (variant === 'active') {
      return `bg-emerald-300 dark:bg-emerald-800 ${getShadowActive()}`
    }

    return `bg-white dark:bg-gray-700 ${getShadow()}`
  }, [variant, backgroundClassName])

  return (
    <View
      className={cn(
        'flex flex-col justify-center rounded-lg',
        getBackgroundClasses,
        className,
      )}
      style={style}
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

export function Card({ variant = 'base', title, footer, children }: CardProps) {
  return (
    <CardBase
      variant={variant}
      title={title}
      footer={footer}
      style={Platform.OS === 'android' ? { elevation: 2 } : undefined}
    >
      {children}
    </CardBase>
  )
}

export function PressableCard({
  title,
  footer,
  children,
  onPress,
}: PressableCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'rounded-lg transition duration-200 ease-in-out active:scale-[0.99]',
      )}
    >
      {({ pressed }) => (
        <CardBase
          variant="base"
          title={title}
          footer={footer}
          backgroundClassName={
            pressed
              ? `bg-gray-100 dark:bg-gray-600 ${getShadow()}`
              : `bg-white dark:bg-gray-700 ${getShadow()}`
          }
          style={Platform.OS === 'android' ? { elevation: 2 } : undefined}
        >
          {children}
        </CardBase>
      )}
    </Pressable>
  )
}
