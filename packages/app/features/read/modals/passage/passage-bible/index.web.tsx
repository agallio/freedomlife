import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { MotiView } from 'moti'

// Components
import { Text } from '../../../../../components/text'
import ListItem from '../../../../../components/list-item'

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
  const selectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.selectedBibleVersion,
  )
  const { setSelectedBiblePassage } = useReadPassagePersistedContext()
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
        // Show ONLY the jump result
        return [
          {
            name: `${jumpResult.bookName} ${jumpResult.chapter}`,
            abbr: jumpResult.bookAbbr,
            passage: jumpResult.chapter,
            isJumpResult: true,
          },
        ]
      }

      // The first item in `passageData` is reserved for search input.
      // But since on web we're using a separate search input component,
      // we should remove that from the array.
      const cleanPassageData = passageData.slice(1)

      if (searchText !== '') {
        return cleanPassageData.filter((passage) =>
          passage.name.toLowerCase().includes(searchText.toLowerCase()),
        )
      }

      return cleanPassageData
    }, [searchText])

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

      // Web: close modal and redirect to chapter
      handlePassageBack?.(selectedPassage)
    } else {
      // Normal book selection: proceed to chapter selection
      setDialogSelectedPassage(selectedPassage)
      redirectToPassageChapterScreen()
    }
  }

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 200 }}
    >
      <View className="gap-2">
        {searchText.length > 0 && filteredPassageData.length === 0 ? (
          <View className="flex-1 items-center justify-center py-4">
            <Text className="text-center">
              Tidak ada hasil untuk &quot;{searchText}&quot;
            </Text>
          </View>
        ) : (
          filteredPassageData.map((passage) => (
            <PassageBibleItem
              key={passage.abbr}
              abbr={passage.abbr}
              name={passage.name}
              selectedBibleVersion={selectedBibleVersion}
              onClick={onClick}
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
  selectedBibleVersion: string
  onClick: (_: { selectedPassage: string; isJumpResult?: boolean }) => void
  isJumpResult?: boolean
  chapter?: number
}) {
  // Memoized Values
  const disabled = useMemo(() => {
    // Jump results are never disabled
    if (isJumpResult) return false

    const tsiAbbrLookupSet = new Set(tsiAbbrs)
    return selectedBibleVersion === 'tsi' && !tsiAbbrLookupSet.has(abbr)
  }, [abbr, selectedBibleVersion, isJumpResult])

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
