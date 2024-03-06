import { type PropsWithChildren, type ComponentProps } from 'react'
import { Platform, Pressable, View } from 'react-native'

// Utils
import { cn } from '../utils/helpers'

type ListItemProps = PropsWithChildren<{
  active?: boolean
  disabled?: boolean
  withScaleAnimations?: boolean
  onClick?: ComponentProps<typeof Pressable>['onPress']
}>

const getShadow = (active?: boolean) => {
  if (Platform.OS === 'android') {
    return 'shadow'
  }

  if (active) {
    return 'shadow-sm shadow-emerald-500 dark:shadow-emerald-900'
  }

  return 'shadow-sm shadow-gray-300 dark:shadow-gray-900'
}

const scaleAnimations = {
  disabled: 'web:active:bg-gray-300 web:dark:active:bg-gray-900 ',
  'active-true': 'web:active:bg-emerald-400 web:dark:active:bg-emerald-800',
  'active-false': 'web:active:bg-gray-100 web:dark:active:bg-gray-600',
}

const listItemVariants = {
  disabled:
    'web:hover:dark:bg-gray-900 border-none bg-gray-300 opacity-60 dark:bg-gray-900',
  'active-true':
    'web:hover:bg-emerald-400 web:dark:hover:bg-emerald-800 bg-emerald-300 dark:bg-emerald-700',
  'active-false':
    'web:hover:bg-gray-100 web:hover:dark:bg-gray-600 border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700',
}

export default function ListItem({
  active = false,
  withScaleAnimations = true,
  disabled,
  children,
  onClick,
}: ListItemProps) {
  const key = `active:${active}-disabled:${disabled}`

  return (
    <Pressable
      key={key}
      onPress={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg',
        !disabled && 'transition duration-200 ease-in-out',
        !disabled && withScaleAnimations && 'active:scale-[0.99]',
      )}
    >
      <View
        className={cn(
          'web:transition web:duration-200 flex rounded-lg px-4 py-3',
          disabled
            ? listItemVariants.disabled
            : `${listItemVariants[`active-${active}`]} ${getShadow(active)}`,
          withScaleAnimations
            ? disabled
              ? scaleAnimations.disabled
              : scaleAnimations[`active-${active}`]
            : undefined,
        )}
      >
        {children}
      </View>
    </Pressable>
  )
}
