import { ScrollView } from 'dripsy'

// Components
import PassageCard from './components/PassageCard'
import NewUserCard from './components/NewUserCard'
import NoInternetModal from 'app/components/NoInternetModal'
import FadeInView from 'app/components/FadeInView'

export default function HomeScreen() {
  return (
    // Ignoring TS until Dripsy fixes this ScrollView type issue.
    // @ts-ignore
    <ScrollView sx={{ paddingTop: 'md', paddingX: [32, '2xl'] }}>
      <FadeInView>
        <PassageCard />
        <NewUserCard />
        <NoInternetModal />
      </FadeInView>
    </ScrollView>
  )
}
