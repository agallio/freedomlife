import { Platform } from 'react-native'

// Components
import ScreenScrollView from '../../../../components/scroll-view'
import PassageBible from './components/passage-bible/index'
import PassageGuide from './components/passage-guide'

// Contexts
import { useReadPassageContext } from '../../contexts/read-passage.context'

export default function PassageScreenComponent() {
  const { guided } = useReadPassageContext()

  if (guided.enabled) {
    return (
      <ScreenScrollView
        className={Platform.OS !== 'web' ? 'px-4 pb-20 pt-4' : undefined}
      >
        <PassageGuide />
      </ScreenScrollView>
    )
  }

  return <PassageBible />
}
