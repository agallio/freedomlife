// Screen
import HomeScreenComponent from './screen'

// Components
import NoInternetModal from './components/no-internet.native'

export default function HomeScreen() {
  return <HomeScreenComponent noInternetDialog={<NoInternetModal />} />
}
