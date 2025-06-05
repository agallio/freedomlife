import { Platform, TextInput, View, useColorScheme } from 'react-native'
import { BackspaceIcon } from 'react-native-heroicons/outline'
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid'

// Components
import { IconButton } from '../../../../../../components/button'

// Contexts
import { useReadPassageChapterContext } from '../../../../contexts/read-passage-chapter.context'

// Utils
import { cn, getIconColor } from '../../../../../../utils/helpers'

type PassageSearchInputProps = {
  disabled?: boolean
}

const getShadow = () => {
  if (Platform.OS === 'android') return 'shadow'

  return 'shadow-sm shadow-gray-300 dark:shadow-gray-900'
}

export default function PassageSearchInput({
  disabled,
}: PassageSearchInputProps) {
  const colorScheme = useColorScheme()
  const searchText = useReadPassageChapterContext((state) => state.searchText)
  const { setSearchText } = useReadPassageChapterContext(
    (state) => state.actions,
  )

  return (
    <View
      className={cn(
        'web:mx-4 mb-3 h-[50px] flex-row items-center rounded-lg border bg-white px-2 dark:bg-gray-700',
        getShadow(),
        disabled
          ? 'web:cursor-not-allowed border-gray-300 bg-gray-300 opacity-60 dark:border-gray-900 dark:bg-gray-900'
          : 'border-gray-200 dark:border-gray-600',
      )}
    >
      <View className="pl-1">
        <MagnifyingGlassIcon
          size={20}
          className={
            Platform.OS === 'web'
              ? 'text-emerald-900 dark:text-white'
              : undefined
          }
          color={Platform.OS !== 'web' ? getIconColor(colorScheme) : undefined}
        />
      </View>

      <TextInput
        allowFontScaling={false}
        value={searchText}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        contextMenuHidden={disabled}
        onChangeText={setSearchText}
        placeholder="Cari Kitab ..."
        className={cn(
          'flex-1 text-emerald-900 dark:text-white',
          Platform.OS === 'web' && 'px-3 text-base focus:outline-none',
          Platform.OS !== 'web' && 'px-3 py-3',
        )}
        // text-gray-400
        placeholderTextColor="#9ca3af"
        style={Platform.OS !== 'web' ? { fontSize: 16 } : undefined}
      />

      {searchText !== '' && (
        <View className="pl-2 pr-1">
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
            onClick={() => setSearchText('')}
          />
        </View>
      )}
    </View>
  )
}
