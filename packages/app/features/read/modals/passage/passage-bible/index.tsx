import { useMemo } from 'react'
import { FlatList, View } from 'react-native'

// Components
import { Text } from '../../../../../components/text'
import ListItem from '../../../../../components/list-item'
import PassageSearchInput from './components/passage-search-input'

// Contexts
import { useReadPassageGeneralContext } from '../../../contexts/read-passage.context'
import { useReadPassagePersistedContext } from '../../../contexts/read-passage.context'
import { useReadPassageChapterContext } from '../../../contexts/read-passage-chapter.context'

// Utils
import {
  passageData,
  tsiAbbrs,
  type PassageDataItemType,
} from '../../../../../utils/constants'
import { detectPassageJump } from '../../../utils/passage-jump-detector'

// Types
import type { PassageBibleProps } from '../types'

type PassageDataItemTypeWithJumpResult = PassageDataItemType & {
  isJumpResult?: boolean
}

export default function PassageBible({
  handlePassageBack,
  redirectToPassageChapterScreen,
}: PassageBibleProps) {
  const { setSelectedBiblePassage } = useReadPassagePersistedContext()
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const { updateHighlightedText } = useReadPassageGeneralContext(
    (state) => state.actions,
  )
  const searchText = useReadPassageChapterContext((state) => state.searchText)
  const { setDialogSelectedPassage, setSearchText } =
    useReadPassageChapterContext((state) => state.actions)

  // Memoized Values
  const filteredPassageData: PassageDataItemTypeWithJumpResult[] =
    useMemo(() => {
      // Check for jump format first
      const jumpResult = detectPassageJump(searchText)

      if (jumpResult) {
        // Show search input + ONLY the jump result
        return [
          passageData[0], // search input
          {
            name: `${jumpResult.bookName} ${jumpResult.chapter}`,
            abbr: jumpResult.bookAbbr,
            passage: jumpResult.chapter,
            isJumpResult: true,
          },
        ]
      }

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
  const onClick = ({
    selectedPassage,
    isJumpResult = false,
  }: {
    selectedPassage: string
    isJumpResult?: boolean
  }) => {
    if (isJumpResult) {
      // Direct jump: set both book and chapter, then close modal
      // Remove all highlighted text
      updateHighlightedText([])

      // Select the new bible passage
      setSelectedBiblePassage(selectedPassage)

      // Reset search input
      setSearchText('')

      // Mobile: go directly back to read screen
      handlePassageBack?.()
    } else {
      // Normal book selection: proceed to chapter selection
      setDialogSelectedPassage(selectedPassage)
      redirectToPassageChapterScreen()
    }
  }

  const renderEmptyComponent = () => {
    // Only show empty state if there's a search query but no results
    // (filteredPassageData.length <= 1 means only search input exists)
    if (searchText.length > 0 && filteredPassageData.length <= 1) {
      return (
        <View className="flex-1 items-center justify-center py-4">
          <Text className="text-center text-green-500 dark:text-white">
            Tidak ada hasil untuk &quot;{searchText}&quot;
          </Text>
        </View>
      )
    }
    return null
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
          isJumpResult={item.isJumpResult}
          chapter={item.passage}
        />
      )}
      ListEmptyComponent={renderEmptyComponent}
      contentContainerClassName="px-4 pt-4 pb-20 gap-2"
    />
  )
}

function PassageBibleItem({
  name,
  abbr,
  selectedBibleVersion,
  onClick,
  isJumpResult = false,
  chapter,
}: {
  name: string
  abbr?: string
  selectedBibleVersion: string
  onClick: (_: { selectedPassage: string; isJumpResult?: boolean }) => void
  isJumpResult?: boolean
  chapter?: number
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
          if (isJumpResult && chapter) {
            onClick({ selectedPassage: `${abbr}-${chapter}`, isJumpResult })
          } else {
            onClick({ selectedPassage: abbr, isJumpResult: false })
          }
        }
      }}
    >
      <Text>{name}</Text>
    </ListItem>
  )
}
