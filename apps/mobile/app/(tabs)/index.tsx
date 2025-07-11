import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

// Components
import PassageCard from '@repo/app/features/home/components/passage-card'
import NewUserCard from '@repo/app/features/home/components/new-user-card'
import { Button } from '@repo/app/components/button'

// Contexts
import { useSavedVersesActionContext } from '@repo/app/features/saved/contexts/saved-verses.context'

export default function HomeScreen() {
  const router = useRouter()
  const { resetDatabase } = useSavedVersesActionContext()

  // Methods
  const redirectToReadScreen = () => {
    router.push('/read')
  }

  const openLearnMore = async () => {
    await WebBrowser.openBrowserAsync(
      'https://freedomlife.id/learn?webview=true',
    )
  }

  return (
    <ScrollView contentContainerClassName="flex flex-col px-6 pt-4 gap-4 pb-28 min-[744px]:px-40 md:px-52 lg:px-96">
      <Button text="Reset Database" onClick={() => resetDatabase()} />
      <PassageCard redirectToReadScreen={redirectToReadScreen} />
      <NewUserCard openLearnMore={openLearnMore} />
    </ScrollView>
  )
}
