import { useMemo } from 'react'
import { FlatList } from 'react-native'

// Components
import { Text } from '../../../../../components/text'
import ListItem from '../../../../../components/list-item'
import PassageSearchInput from './components/passage-search-input'

// Contexts
import { useReadPassageChapterContext } from '../../../contexts/read-passage-chapter.context'
import { useReadPassageContext } from '../../../contexts/read-passage.context'

// Utils
import { passageData, tsiAbbrs } from '../../../../../utils/constants'

// Types
import type { PassageBibleProps } from '../types'

export default function PassageBible({
  redirectToPassageChapterScreen,
}: PassageBibleProps) {
  const { selectedBibleVersion } = useReadPassageContext()
  const { searchText, setDialogSelectedPassage } =
    useReadPassageChapterContext()

  // Memoized Values
  const filteredPassageData = useMemo(() => {
    if (searchText !== '') {
      // The first item in `passageData` is reserved for search input.
      // But since we're doing the filtering to only valid passage data,
      // we need to remove that first.
      //
      // So the search component not rendered twice if the search query
      // includes the letter: 's'.
      const cleanPassageData = passageData.slice(1)

      const filteredByName = cleanPassageData.filter((passage) =>
        passage.name.toLowerCase().includes(searchText.toLowerCase()),
      )

      return [passageData[0], ...filteredByName]
    }

    return passageData
  }, [searchText])

  // Methods
  const onClick = (selectedPassage: string) => {
    setDialogSelectedPassage(selectedPassage)
    redirectToPassageChapterScreen()
  }

  return (
    <FlatList
      data={filteredPassageData}
      keyExtractor={(_, index) => `item-${index}`}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <PassageBibleItem
          name={item.name}
          abbr={item?.abbr}
          selectedBibleVersion={selectedBibleVersion}
          onClick={onClick}
        />
      )}
      contentContainerClassName="px-4 pt-4 pb-20 gap-2"
    />
  )
}

function PassageBibleItem({
  name,
  abbr,
  selectedBibleVersion,
  onClick,
}: {
  name: string
  abbr?: string
  selectedBibleVersion: string
  onClick: (_selectedPassage: string) => void
}) {
  // Memoized Values
  const disabled = useMemo(() => {
    const tsiAbbrLookupSet = new Set(tsiAbbrs)

    return abbr
      ? selectedBibleVersion === 'tsi' && !tsiAbbrLookupSet.has(abbr)
      : false
  }, [abbr, selectedBibleVersion])

  if (name === 'search') {
    return <PassageSearchInput />
  }

  return (
    <ListItem
      disabled={disabled}
      onClick={() => {
        if (abbr) {
          onClick(abbr)
        }
      }}
    >
      <Text>{name}</Text>
    </ListItem>
  )
}
