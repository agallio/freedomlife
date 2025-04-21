import { useRouter } from 'expo-router'

// Components
import PassageModal from '@repo/app/features/read/modals/passage'

export default function PassageScreen() {
  const router = useRouter()

  // Methods
  const handlePassageBack = () => {
    router.back()
  }

  const redirectToPassageChapterScreen = () => {
    router.push('/passage-chapter')
  }

  return (
    <PassageModal
      handlePassageBack={handlePassageBack}
      redirectToPassageChapterScreen={redirectToPassageChapterScreen}
    />
  )
}
