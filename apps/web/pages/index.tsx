import { useRouter } from 'next/router'

// Components
import PassageCard from '@repo/app/features/home/components/passage-card'
import NewUserCard from '@repo/app/features/home/components/new-user-card'
import AppDownload from '@repo/app/features/home/components/app-download.web'
import FooterCredits from '@repo/app/features/home/components/footer-credits.web'

// Icon Components
import FreedomLifeIcon from '@repo/app/components/icons/freedomlife-icon'

export default function HomePage() {
  const router = useRouter()

  // Methods
  const redirectToReadScreen = () => {
    router.push('/read')
  }

  const openLearnMore = async () => {
    router.push('/learn')
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col px-6 pb-28 pt-4 sm:max-w-md">
      <div className="flex pb-4">
        <FreedomLifeIcon className="w-[230px]" />
      </div>

      <div className="flex flex-col gap-4">
        <PassageCard redirectToReadScreen={redirectToReadScreen} />
        <NewUserCard openLearnMore={openLearnMore} />
      </div>

      <AppDownload />
      <FooterCredits />
    </div>
  )
}
