// Screen
import HomeScreenComponent from './screen'

// Components
import FooterCredits from './components/footer-credits.web'
import AppDownload from './components/app-download.web'

export default function HomeScreen() {
  return (
    <>
      <HomeScreenComponent />
      <AppDownload />
      <FooterCredits />
    </>
  )
}
