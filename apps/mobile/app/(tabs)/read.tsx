import { useRouter } from 'expo-router'

// Components
import ReadTypography from '@repo/app/features/read/components/read-typography'

export default function ReadScreen() {
  const router = useRouter()

  // Methods
  const redirectToBiblePassage = (passage: string) => {
    router.push(`/read/bible?chapter=${passage}`)
  }

  return <ReadTypography redirectToBiblePassage={redirectToBiblePassage} />
}
