// Screen
import HomeScreen from '@repo/app/features/home'

// Icon Components
import FreedomLifeIcon from '@repo/app/components/icons/freedomlife-icon'

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col px-6 pb-28 pt-4 sm:max-w-md">
      <div className="flex pb-4">
        <FreedomLifeIcon className="w-[230px]" />
      </div>

      <HomeScreen />
    </div>
  )
}
