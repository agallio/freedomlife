import { View } from 'react-native'

// Components
import { Card } from '../../components/card'
import { Text } from '../../components/text'
import { SquareButton } from '../../components/button'

// Types
import type { PassageDataItemType } from '../../utils/constants'

export default function SharedPassageChapterList({
  passageDetailData,
  handlePassageNumberClick,
}: {
  passageDetailData?: PassageDataItemType
  handlePassageNumberClick: (_passageNumber: number) => void
}) {
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
            onClick={() => handlePassageNumberClick(passageNumber + 1)}
          />
        ))}
      </View>
    </Card>
  )
}
