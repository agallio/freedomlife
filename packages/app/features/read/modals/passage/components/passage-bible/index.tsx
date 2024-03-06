import { useMemo } from 'react'
import { FlatList, Platform } from 'react-native'
import { useRouter } from 'solito/router'

// Components
import { Text } from '../../../../../../components/text'
import ListItem from '../../../../../../components/list-item'
import PassageSearchInput from '../passage-search-input'

// Contexts
import { useReadPassageChapterContext } from '../../../../contexts/read-passage-chapter.context'

// Utils
import {
  passageData,
  type PassageDataItemType,
} from '../../../../../../utils/constants'

export type PassageBibleProps = {
  data: PassageDataItemType[]
}

export default function PassageBible() {
  const { push } = useRouter()
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
    if (Platform.OS !== 'web') {
      setDialogSelectedPassage(selectedPassage)
      push('/passage-chapter')
    }
  }

  return (
    <FlatList
      data={filteredPassageData}
      keyExtractor={(_, index) => `item-${index}`}
      scrollEventThrottle={16}
      renderItem={({ item }) => {
        if (item.name === 'search') {
          return <PassageSearchInput />
        }

        return (
          <ListItem onClick={() => onClick(item.abbr)}>
            <Text>{item.name}</Text>
          </ListItem>
        )
      }}
      contentContainerClassName="px-4 pt-4 pb-20 gap-2"
    />
  )
}
