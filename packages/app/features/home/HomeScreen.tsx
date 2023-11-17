import { ScrollView } from 'dripsy'

// Components
import PassageCard from './components/PassageCard'
import NewUserCard from './components/NewUserCard'
import NoInternetModal from 'app/components/NoInternetModal'
import FadeInView from 'app/components/FadeInView'
import { Platform } from 'react-native'

export default function HomeScreen() {
  const Component = (
    <>
      <PassageCard />
      <NewUserCard />
      <NoInternetModal />
    </>
  )

  return (
    // Ignoring TS until Dripsy fixes this ScrollView type issue.
    // @ts-ignore
    <ScrollView
      contentContainerSx={{
        paddingTop: 'md',
        paddingX: [32, '2xl'],
      }}
    >
      {Platform.OS === 'ios' ? <FadeInView>{Component}</FadeInView> : Component}
    </ScrollView>
  )
}
