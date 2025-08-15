import { useMemo } from 'react'
import { View } from 'react-native'
import { MotiView } from 'moti'

// Components
import { Text } from '../../../components/text'
import ListItem from '../../../components/list-item'

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
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 200 }}
    >
      <View className="gap-2">
        {isEmpty ? (
          <View className="flex-1 items-center justify-center py-4">
            <Text className="text-center">{emptyText}</Text>
          </View>
        ) : (
          passageData.map((passage) => (
            <PassageBibleItem
              key={passage.abbr}
              abbr={passage.abbr}
              name={passage.name}
              selectedBibleVersion={selectedBibleVersion}
              onClick={handleSelectPassage}
              isJumpResult={passage.isJumpResult}
              chapter={passage.passage}
            />
          ))
        )}
      </View>
    </MotiView>
  )
}

function PassageBibleItem({
  abbr,
  name,
  selectedBibleVersion,
  onClick,
  isJumpResult = false,
  chapter,
}: {
  abbr: string
  name: string
  selectedBibleVersion?: string
  onClick: (_: { selectedPassage: string; isJumpResult?: boolean }) => void
  isJumpResult?: boolean
  chapter?: number
}) {
  // Memoized Values
  const disabled = useMemo(() => {
    if (selectedBibleVersion) {
      const tsiAbbrLookupSet = new Set(tsiAbbrs)
      return selectedBibleVersion === 'tsi' && !tsiAbbrLookupSet.has(abbr)
    }

    return false
  }, [abbr, selectedBibleVersion])

  return (
    <ListItem
      disabled={disabled}
      onClick={() => {
        onClick({ selectedPassage: `${abbr}-${chapter}`, isJumpResult })
      }}
    >
      <Text>{name}</Text>
    </ListItem>
  )
}
