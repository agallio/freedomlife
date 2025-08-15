import { useMemo } from 'react'
import { FlatList, View } from 'react-native'

// Components
import { Text } from '../../../components/text'
import ListItem from '../../../components/list-item'
import SharedPassageSearchInput from '../shared-passage-search-input'

// Constants
import { tsiAbbrs } from '../../../utils/constants'

// Types
import type { SharedPassageListProps } from './types'

export default function SharedPassageList({
  isEmpty,
  emptyText,
  passageData,
  selectedBibleVersion,
  handleSelectPassage,
}: SharedPassageListProps) {
  return (
    <FlatList
      data={passageData}
      keyExtractor={(_, index) => `item-${index}`}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <PassageBibleItem
          name={item.name}
          abbr={item?.abbr}
          selectedBibleVersion={selectedBibleVersion}
          onClick={handleSelectPassage}
          isJumpResult={item.isJumpResult}
          chapter={item.passage}
        />
      )}
      ListEmptyComponent={
        <ListEmptyComponent isEmpty={isEmpty} emptyText={emptyText} />
      }
      contentContainerClassName="px-4 pt-4 pb-20 gap-2"
    />
  )
}

function ListEmptyComponent({
  isEmpty,
  emptyText,
}: Pick<SharedPassageListProps, 'isEmpty' | 'emptyText'>) {
  // Only show empty state if there's a search query but no results
  // (filteredPassageData.length <= 1 means only search input exists)
  if (isEmpty) {
    return (
      <View className="flex-1 items-center justify-center py-4">
        <Text className="text-center text-green-500 dark:text-white">
          {emptyText}
        </Text>
      </View>
    )
  }

  return null
}

function PassageBibleItem({
  name,
  abbr,
  selectedBibleVersion,
  isJumpResult = false,
  chapter,
  onClick,
}: {
  name: string
  abbr?: string
  selectedBibleVersion?: string
  isJumpResult?: boolean
  chapter?: number
  onClick: (_: { selectedPassage: string; isJumpResult?: boolean }) => void
}) {
  // Memoized Values
  const disabled = useMemo(() => {
    if (selectedBibleVersion) {
      const tsiAbbrLookupSet = new Set(tsiAbbrs)

      return abbr
        ? selectedBibleVersion === 'tsi' && !tsiAbbrLookupSet.has(abbr)
        : false
    }

    return false
  }, [abbr, selectedBibleVersion])

  if (name === 'search') {
    return <SharedPassageSearchInput />
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
