import { useMemo } from 'react'
import { Platform, View } from 'react-native'
import { MotiView } from 'moti'

// Components
import { Text } from '../../../../../../components/text'
import ListItem from '../../../../../../components/list-item'

// Contexts
import { useReadModalsContext } from '../../../../contexts/read-modals.context'
import { useReadPassageChapterContext } from '../../../../contexts/read-passage-chapter.context'
import { useReadPassageContext } from '../../../../contexts/read-passage.context'

// Utils
import {
  passageData,
  tsiAbbrs,
  type PassageDataItemType,
} from '../../../../../../utils/constants'

export type PassageBibleProps = {
  data: PassageDataItemType[]
}

export default function PassageBible() {
  const { setOpenPassageChapter } = useReadModalsContext()
  const { selectedBibleVersion } = useReadPassageContext()
  const { searchText, setDialogSelectedPassage } =
    useReadPassageChapterContext()

  // Memoized Values
  const filteredPassageData = useMemo(() => {
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

  const onClick = (selectedPassage: string) => {
    if (Platform.OS === 'web') {
      setOpenPassageChapter(true)
      setDialogSelectedPassage(selectedPassage)
    }
  }

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 200 }}
    >
      <View className="gap-2">
        {filteredPassageData.map((passage) => (
          <PassageBibleItem
            key={passage.abbr}
            abbr={passage.abbr}
            name={passage.name}
            selectedBibleVersion={selectedBibleVersion}
            onClick={onClick}
          />
        ))}
      </View>
    </MotiView>
  )
}

function PassageBibleItem({
  abbr,
  name,
  selectedBibleVersion,
  onClick,
}: {
  abbr: string
  name: string
  selectedBibleVersion: string
  onClick: (_selectedPassage: string) => void
}) {
  // Memoized Values
  const disabled = useMemo(() => {
    const tsiAbbrLookupSet = new Set(tsiAbbrs)

    return selectedBibleVersion === 'tsi' && !tsiAbbrLookupSet.has(abbr)
  }, [abbr, selectedBibleVersion])

  return (
    <ListItem disabled={disabled} onClick={() => onClick(abbr)}>
      <Text>{name}</Text>
    </ListItem>
  )
}
