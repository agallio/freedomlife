import { Platform, TouchableOpacity, useColorScheme, View } from 'react-native'
import {
  CheckIcon,
  BookmarkIcon as BookmarkIconSolid,
  DocumentDuplicateIcon,
} from 'react-native-heroicons/solid'
import { BookmarkIcon as BookmarkIconOutline } from 'react-native-heroicons/outline'

// Components
import { Text } from '../../../../components/text'
import { Button } from '../../../../components/button'

// Utils
import { cn, getIconColor } from '../../../../utils/helpers'
import { highlighterColors } from '../../../../utils/constants'

// Types
import type { SaverScreenComponentProps } from './types'

export default function SaverScreenComponent({
  handleCopyClick,
}: SaverScreenComponentProps) {
  const colorScheme = useColorScheme()

  const defaultIconColor = getIconColor(colorScheme)

  return (
    <View className="my-2 flex flex-col items-center gap-4">
      <View className="w-full items-center justify-center border-b border-gray-300 pb-4 dark:border-gray-700">
        <View>
          <Button
            text="Salin Ayat"
            icon={
              <View className="mr-1.5">
                <DocumentDuplicateIcon size={20} color={defaultIconColor} />
              </View>
            }
            className="border border-gray-200 bg-white dark:border-gray-600"
            onClick={handleCopyClick}
          />
        </View>
      </View>

      <View className="flex w-full max-w-[300px] flex-row justify-between">
        {Object.entries(highlighterColors).map(([key, value]) => (
          <TouchableOpacity
            accessible
            key={key}
            accessibilityRole="button"
            accessibilityLabel={value.accessibility.label}
            accessibilityHint={value.accessibility.hint}
          >
            <View
              className={cn(
                'flex h-[50px] w-[50px] items-center justify-center rounded-full',
                Platform.OS === 'web' &&
                  `transition duration-200 ease-in-out ${value.hoverColor}`,
                value.color,
              )}
            >
              {key === 'bookmark' ? (
                <BookmarkIconOutline
                  size={24}
                  color={value.iconColor[colorScheme || 'light']}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
          Tekan warna untuk menyorot ayat atau tekan ikon untuk menandai
          pembatas buku.
        </Text>
      </View>
    </View>
  )
}
