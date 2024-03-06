import { type ReactNode } from 'react'
import { Platform } from 'react-native'

// Components
import ScreenScrollView from '../../components/scroll-view'
import PassageCard from './components/passage-card'
import NewUserCard from './components/new-user-card'

export default function HomeScreenComponent({
  noInternetDialog,
}: {
  noInternetDialog?: ReactNode
}) {
  return (
    <ScreenScrollView
      className={Platform.OS === 'web' ? 'flex flex-col gap-4' : undefined}
      contentContainerClassName={
        Platform.OS !== 'web'
          ? 'flex flex-col px-6 pt-4 gap-4 pb-28 md:px-52 lg:px-96'
          : undefined
      }
    >
      <PassageCard />
      <NewUserCard />

      {noInternetDialog}
    </ScreenScrollView>
  )
}
