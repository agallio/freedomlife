import { useMemo } from 'react'

// Components
import SharedPassageChapterList from '../../../[shared]/shared-passage-chapter-list'

// Contexts
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../contexts/read-passage.context'
import { useReadPassageChapterContext } from '../../contexts/read-passage-chapter.context'

// Utils
import { passageData } from '../../../../utils/constants'

// Types
import type { PassageChapterProps } from './types'

export default function PassageChapter({
  handlePassageChapterBack,
}: PassageChapterProps) {
  const { setSelectedBiblePassage } = useReadPassagePersistedContext()
  const { updateSelectedText } = useReadPassageGeneralContext(
    (state) => state.actions,
  )
  const dialogSelectedPassage = useReadPassageChapterContext(
    (state) => state.dialogSelectedPassage,
  )
  const { setSearchText } = useReadPassageChapterContext(
    (state) => state.actions,
  )

  // Memoized Values
  const passageDetailData = useMemo(() => {
    return passageData.find(
      (passage) => dialogSelectedPassage.includes(passage.abbr) && passage.abbr,
    )
  }, [dialogSelectedPassage])

  // Methods
  const onPassageNumberClick = (passageNumber: number) => {
    if (passageDetailData) {
      const newPassage = `${passageDetailData.abbr}-${passageNumber}`

      // Remove all highlighted text
      updateSelectedText([])

      // Select the new bible passage
      setSelectedBiblePassage(newPassage)

      // Reset search input
      setSearchText('')

      // Web: close modal
      // Native: back to read stack
      handlePassageChapterBack?.(newPassage)
    }
  }

  return (
    <SharedPassageChapterList
      passageDetailData={passageDetailData}
      handlePassageNumberClick={onPassageNumberClick}
    />
  )
}
