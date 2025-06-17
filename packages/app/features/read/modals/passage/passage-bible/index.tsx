import { useMemo } from 'react'

// Components
import SharedPassageList from '../../../../[shared]/shared-passage-list'

// Contexts
import { useReadPassageGeneralContext } from '../../../contexts/read-passage.context'
import { useReadPassagePersistedContext } from '../../../contexts/read-passage.context'
import { useReadPassageChapterContext } from '../../../contexts/read-passage-chapter.context'

// Utils
import {
  passageData,
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

  return (
    <SharedPassageList
      isEmpty={searchText.length > 0 && filteredPassageData.length === 0}
      emptyText={`Tidak ada hasil untuk "${searchText}"`}
      passageData={filteredPassageData}
      selectedBibleVersion={selectedBibleVersion}
      handleSelectPassage={onClick}
    />
  )
}
