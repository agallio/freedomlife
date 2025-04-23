import { useRouter } from 'expo-router'

// Components
import TranslateModal from '@repo/app/features/read/modals/translate'

export default function TranslateScreen() {
  const router = useRouter()

  // Methods
  const handleBackMobile = () => {
    router.back()
  }

  return <TranslateModal handleBackMobile={handleBackMobile} />
}
