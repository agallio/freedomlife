import { useMemo } from 'react'
import { Platform, View } from 'react-native'
import { useRouter } from 'solito/router'

// Components
import Card from '../../../../components/card'
import { Text } from '../../../../components/text'
import { SquareButton } from '../../../../components/button'
import ScreenScrollView from '../../../../components/scroll-view'

// Contexts
import { useReadModalsContext } from '../../contexts/read-modals.context'
import { useReadPassageContext } from '../../contexts/read-passage.context'
import { useReadPassageChapterContext } from '../../contexts/read-passage-chapter.context'

// Utils
import { passageData } from '../../../../utils/constants'
import { cn } from '../../../../utils/helpers'

export function PassageChapterScreenComponent() {
  const router = useRouter()
  const { setOpenPassage, setOpenPassageChapter } = useReadModalsContext()
  const { updateHighlightedText, setSelectedBiblePassage } =
    useReadPassageContext()
  const { dialogSelectedPassage, setSearchText } =
    useReadPassageChapterContext()

  // Memoized Values
  const passageDetailData = useMemo(() => {
    return passageData.find((passage) => passage.abbr === dialogSelectedPassage)
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

      if (Platform.OS === 'web') {
        // Web: close modal
        setOpenPassage(false)
        setOpenPassageChapter(false)
        router.push(`/read/bible?chapter=${newPassage}`)
      } else {
        // Native: back to read stack
        router.replace('/read')
      }
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
    <ScreenScrollView
      contentContainerClassName={cn(
        Platform.OS !== 'web' ? 'px-4 pb-20 pt-4' : undefined,
      )}
    >
      <Card
        title={
          <View className="flex items-center py-2">
            <Text customFontWeight="font-semibold">
              {passageDetailData.name}
            </Text>
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
    </ScreenScrollView>
  )
}
