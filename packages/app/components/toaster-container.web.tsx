import { type ReactNode } from 'react'
import { View } from 'react-native'
import { Toaster } from 'burnt/web'

// Components
import { Text } from './text'

// Utils
import useMediaQuery from '../utils/hooks/use-media-query.web'
import { cn } from '../utils/helpers'

/**
 * Web only!
 */
export default function ToasterContainer() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <Toaster
      position={isDesktop ? 'top-right' : 'bottom-center'}
      style={
        !isDesktop
          ? {
              // @ts-ignore
              '--width': '92%',
              '--mobile-offset': '4%',
              bottom: 'max(100px, env(safe-area-inset-bottom))',
            }
          : {
              '--width': '300px',
            }
      }
      visibleToasts={1}
      toastOptions={{
        className:
          'flex-wrap bg-white dark:bg-gray-600 dark:border-gray-700 dark:text-white',
      }}
    />
  )
}

/**
 * Web only!
 */
export function ToasterWebComponent({
  icon,
  title,
  message,
}: {
  icon?: ReactNode
  title: string
  message?: string
}) {
  return (
    <View className="flex w-full flex-row flex-wrap items-center gap-3 text-emerald-900 dark:text-white">
      {icon}

      <View className={cn('flex-wrap', !icon ? 'pl-2' : undefined)}>
        <Text customFontWeight="font-semibold">{title}</Text>
        <Text customFontSize="text-sm">{message}</Text>
      </View>
    </View>
  )
}
