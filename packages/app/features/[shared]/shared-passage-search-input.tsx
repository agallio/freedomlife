import { Platform, useColorScheme } from 'react-native'
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid'

// Components
import SearchInput from '../../components/search-input'

// Contexts
import { useReadPassageChapterContext } from '../read/contexts/read-passage-chapter.context'

// Utils
import { getIconColor } from '../../utils/helpers'

type PassageSearchInputProps = {
  disabled?: boolean
}

export default function SharedPassageSearchInput({
  disabled,
}: PassageSearchInputProps) {
  const colorScheme = useColorScheme()
  const globalSearchText = useReadPassageChapterContext(
    (state) => state.searchText,
  )
  const { setSearchText } = useReadPassageChapterContext(
    (state) => state.actions,
  )

  // Methods
  const handleTextChange = (text: string) => {
    setSearchText(text)
  }

  return (
    <SearchInput
      withClearButton
      withMarginBottom
      initialSearchText={globalSearchText}
      placeholderText="Cari Kitab ..."
      debounceDelay={500}
      disabled={disabled}
      LeftIcon={
        <MagnifyingGlassIcon
          size={20}
          className={
            Platform.OS === 'web'
              ? 'text-emerald-900 dark:text-white'
              : undefined
          }
          color={Platform.OS !== 'web' ? getIconColor(colorScheme) : undefined}
        />
      }
      updateSearchText={handleTextChange}
    />
  )
}
