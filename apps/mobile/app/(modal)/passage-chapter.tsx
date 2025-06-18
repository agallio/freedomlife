import { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'

// Components
import PassageChapter from '@repo/app/features/read/modals/passage/passage-chapter'

export default function PassageChapterScreen() {
  const router = useRouter()

  // Methods
  const handlePassageChapterBack = useCallback(() => {
    if (router.canDismiss()) router.dismissAll()
    router.replace('/read')
  }, [])

  return (
    <ScrollView contentContainerClassName="px-4 pb-20 pt-4">
      <PassageChapter handlePassageChapterBack={handlePassageChapterBack} />
    </ScrollView>
  )
}
