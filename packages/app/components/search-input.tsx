import { useMemo, useState, type ReactNode } from 'react'
import { Platform, TextInput, useColorScheme, View } from 'react-native'
import { BackspaceIcon } from 'react-native-heroicons/outline'
import debounce from 'lodash.debounce'

// Components
import { IconButton } from './button'

// Utils
import { cn, getIconColor } from '../utils/helpers'

const getShadow = () => {
  if (Platform.OS === 'android') return 'shadow'

  return 'shadow-sm shadow-gray-300 dark:shadow-gray-900'
}

type SearchInputProps = {
  initialSearchText: string
  placeholderText: string
  disabled?: boolean
  debounceDelay?: number
  autoCapitalize?: boolean
  withClearButton?: boolean
  withMarginBottom?: boolean
  LeftIcon?: ReactNode
  updateSearchText: (_text: string) => void
}

export default function SearchInput({
  initialSearchText,
  placeholderText,
  disabled,
  debounceDelay,
  autoCapitalize,
  withClearButton,
  withMarginBottom,
  LeftIcon,
  updateSearchText,
}: SearchInputProps) {
  const colorScheme = useColorScheme()
  const [localSearchText, setLocalSearchText] = useState(initialSearchText)

  // Memoized Values
  const debouncedSearch = useMemo(
    () => debounce(updateSearchText, debounceDelay || 300),
    [debounceDelay, updateSearchText],
  )

  // Methods
  const handleTextChange = (text: string) => {
    setLocalSearchText(text)
    debouncedSearch(text)
  }

  const handleClear = () => {
    setLocalSearchText('')
    updateSearchText('')
    debouncedSearch.cancel()
  }

  return (
    <View
      className={cn(
        'web:mx-4 h-[50px] flex-row items-center rounded-lg border bg-white px-2 dark:bg-gray-700',
        getShadow(),
        disabled
          ? 'web:cursor-not-allowed border-gray-300 bg-gray-300 opacity-60 dark:border-gray-900 dark:bg-gray-900'
          : 'border-gray-200 dark:border-gray-600',
        withMarginBottom && 'mb-3',
      )}
    >
      {LeftIcon && <View className="pl-1">{LeftIcon}</View>}

      <TextInput
        allowFontScaling={false}
        value={localSearchText}
        editable={!disabled}
        autoCapitalize={autoCapitalize ? 'sentences' : 'none'}
        selectTextOnFocus={!disabled}
        contextMenuHidden={disabled}
        onChangeText={handleTextChange}
        placeholder={placeholderText}
        className={cn(
          'flex-1 text-emerald-900 dark:text-white',
          Platform.OS === 'web' && 'px-3 text-base focus:outline-none',
          Platform.OS !== 'web' && 'py-3',
          Platform.OS !== 'web' ? (LeftIcon ? 'px-3' : 'px-2') : undefined,
        )}
        // text-gray-400
        placeholderTextColor="#9ca3af"
        style={Platform.OS !== 'web' ? { fontSize: 16 } : undefined}
      />

      {withClearButton && localSearchText !== '' && (
        <View
          className={cn(
            'pl-2',
            Platform.OS !== 'web' ? (LeftIcon ? 'pr-1' : 'pr-2') : undefined,
          )}
        >
          <IconButton
            size="sm"
            variant="transparent"
            disabled={disabled}
            icon={
              <BackspaceIcon
                size={20}
                className={
                  Platform.OS === 'web'
                    ? 'text-emerald-900 dark:text-white'
                    : undefined
                }
                color={
                  Platform.OS !== 'web' ? getIconColor(colorScheme) : undefined
                }
              />
            }
            onClick={handleClear}
          />
        </View>
      )}
    </View>
  )
}
