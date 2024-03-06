import { type ComponentProps, type ReactNode } from 'react'
import { Platform, Pressable, View } from 'react-native'

// Components
import { Text, type CustomFontSizeType } from './text'

// Utils
import { cn } from '../utils/helpers'

export type ButtonProps = {
  text: string
  icon?: ReactNode
  fullWidth?: boolean
  variant?: 'default' | 'card' | 'passage'
  ariaLabel?: string
  className?: string
  textClassName?: string
  disabled?: boolean
  onClick?: ComponentProps<typeof Pressable>['onPress']
}

const getShadow = () => {
  if (Platform.OS === 'android') {
    return undefined
  }

  return 'shadow-sm shadow-gray-300 dark:shadow-gray-900'
}

const getShadowPassage = () => {
  if (Platform.OS === 'android') {
    return undefined
  }

  return 'shadow-sm shadow-emerald-500 dark:shadow-emerald-900'
}

const buttonVariants = {
  default: {
    parent: `bg-white dark:bg-gray-700 ${getShadow()}`,
    hover: 'web:hover:bg-gray-100 web:dark:hover:bg-gray-600',
    text: 'uppercase tracking-wider',
  },
  card: {
    parent: undefined,
    hover: undefined,
    text: 'uppercase tracking-wider',
  },
  passage: {
    parent: `py-2 px-6 bg-emerald-300 dark:bg-emerald-800 ${getShadowPassage()}`,
    hover:
      'web:active:bg-emerald-400 dark:web:active:bg-emerald-700 web:hover:bg-emerald-400 web:dark:hover:bg-emerald-700',
    text: undefined,
  },
}

export function Button({
  text,
  icon,
  fullWidth,
  variant = 'default',
  ariaLabel,
  className,
  textClassName,
  disabled,
  onClick,
}: ButtonProps) {
  const key = `${variant}-${text.toLowerCase().replace(' ', '_')}`

  return (
    <Pressable
      key={key}
      role="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onPress={onClick}
      className={cn(
        'rounded-full',
        !disabled && 'transition duration-300 ease-in-out',
        !disabled && fullWidth
          ? 'w-full active:scale-[0.96]'
          : 'self-start active:scale-95',
        disabled && 'web:active:scale-100',
      )}
    >
      <View
        className={cn(
          'web:transition web:duration-200 flex-row items-center justify-center rounded-full py-2',
          fullWidth ? 'w-full' : 'w-[fit-content] px-4',
          buttonVariants[variant]?.parent,
          !disabled && buttonVariants[variant]?.hover,
          className,
        )}
        style={
          Platform.OS === 'android' && variant !== 'card'
            ? { elevation: 2 }
            : undefined
        }
      >
        {icon}
        <Text
          customFontWeight="font-bold"
          className={cn(
            'select-none',
            buttonVariants[variant]?.text,
            textClassName,
          )}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  )
}

type IconButtonProps = {
  icon: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'base' | 'active' | 'transparent' | 'custom'
  noShadow?: boolean
  className?: string
  ariaLabel?: string
  disabled?: boolean
  onClick?: ComponentProps<typeof Pressable>['onPress']
}

export function IconButton({
  icon,
  size = 'md',
  variant = 'base',
  noShadow,
  className,
  ariaLabel,
  disabled,
  onClick,
}: IconButtonProps) {
  const withShadow = variant !== 'transparent' && !noShadow

  return (
    <Pressable
      role="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onPress={onClick}
      className={cn(
        variant !== 'transparent' && 'rounded-full',
        !disabled && 'transition duration-300 ease-in-out active:scale-90',
      )}
    >
      <View
        className={cn(
          'web:transition web:duration-200 flex items-center justify-center self-start',
          variant !== 'transparent' && 'rounded-full',
          withShadow && getShadow(),
          variant === 'base' &&
            'web:hover:bg-gray-100 web:dark:hover:bg-gray-600 web:active:bg-gray-100 web:dark:active:bg-gray-900 border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700',
          variant === 'active' &&
            'web:hover:bg-emerald-400 web:dark:hover:bg-emerald-600 web:active:bg-emerald-400 web:dark:active:bg-emerald-600 bg-emerald-300 dark:bg-emerald-700',
          variant !== 'transparent' && size === 'sm' && 'p-2',
          variant !== 'transparent' && size === 'md' && 'p-3',
          variant !== 'transparent' && size === 'lg' && 'p-4',
          className,
        )}
        style={
          Platform.OS === 'android' && withShadow ? { elevation: 2 } : undefined
        }
      >
        {icon}
      </View>
    </Pressable>
  )
}

type SquareButtonProps = {
  text: string
  size?: 'sm' | 'md'
  variant?: 'base' | 'active' | 'transparent' | 'custom'
  noShadow?: boolean
  ariaLabel?: string
  disabled?: boolean
  className?: string
  onClick?: ComponentProps<typeof Pressable>['onPress']
}

const squareButtonVariants = {
  sm: {
    parent: 'w-[40px] h-[40px]',
    fontSize: 'text-sm' as CustomFontSizeType,
  },
  md: {
    parent: 'w-[50px] h-[50px]',
    fontSize: undefined,
  },
}

export function SquareButton({
  text,
  size = 'md',
  ariaLabel,
  disabled,
  onClick,
}: SquareButtonProps) {
  return (
    <Pressable
      role="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onPress={onClick}
      className={cn(
        !disabled && 'transition duration-300 ease-in-out active:scale-90',
      )}
    >
      <View
        className={cn(
          'web:hover:bg-gray-100 web:dark:hover:bg-gray-800 web:transition web:duration-200 items-center justify-center rounded border-2 border-gray-300 bg-white dark:border-gray-500 dark:bg-gray-700',
          squareButtonVariants[size].parent,
        )}
      >
        <Text customFontSize={squareButtonVariants[size].fontSize}>{text}</Text>
      </View>
    </Pressable>
  )
}
