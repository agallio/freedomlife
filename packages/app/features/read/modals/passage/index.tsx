import { ScrollView } from 'react-native'

// Components
import PassageGuide from './passage-guide'
import PassageBible from './passage-bible'

// Contexts
import { useReadPassageContext } from '../../contexts/read-passage.context'

// Types
import type { PassageModalProps } from './types'

export default function PassageModal({
  handlePassageBack,
  redirectToPassageChapterScreen,
}: PassageModalProps) {
  const { guided } = useReadPassageContext()

  if (guided.enabled) {
    return (
      <ScrollView className="px-4 pb-20 pt-4">
        <PassageGuide handlePassageBack={handlePassageBack} />
      </ScrollView>
    )
  }

  return (
    <PassageBible
      redirectToPassageChapterScreen={redirectToPassageChapterScreen}
    />
  )
}
