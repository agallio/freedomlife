import { useMemo } from 'react'
import { View } from 'react-native'

// Components
import Card from '../../../../components/card'
import { Text } from '../../../../components/text'
import { SquareButton } from '../../../../components/button'

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
  const { updateHighlightedText } = useReadPassageGeneralContext(
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
      updateHighlightedText([])

      // Select the new bible passage
      setSelectedBiblePassage(newPassage)

      // Reset search input
      setSearchText('')

      // Web: close modal
      // Native: back to read stack
      handlePassageChapterBack?.(newPassage)
    }
  }

  if (!passageDetailData) {
    return (
      <View>
        <Text>Pasal tidak ditemukan.</Text>
      </View>
    )
  }

  return (
    <Card
      title={
        <View className="flex items-center py-2">
          <Text customFontWeight="font-semibold">{passageDetailData.name}</Text>
        </View>
      }
    >
      <View className="flex flex-row flex-wrap justify-center gap-2 p-4">
        {[...Array(passageDetailData.passage).keys()].map((passageNumber) => (
          <SquareButton
            key={passageNumber}
            text={String(passageNumber + 1)}
            onClick={() => onPassageNumberClick(passageNumber + 1)}
          />
        ))}
      </View>
    </Card>
  )
}
