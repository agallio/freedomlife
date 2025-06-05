import { useRouter } from 'expo-router'

// Components
import GuideMonthList from '@repo/app/features/guide/components/guide-month-list'

// Contexts
import { useReadPassageGeneralContext } from '@repo/app/features/read/contexts/read-passage.context'

export default function GuideMonthScreen() {
  const router = useRouter()
  const selectedGuideMonth = useReadPassageGeneralContext(
    (state) => state.selectedGuideMonth,
  )
  const { setSelectedGuideMonth } = useReadPassageGeneralContext(
    (state) => state.actions,
  )

  // Methods
  const onMonthClick = (monthString: string) => {
    setSelectedGuideMonth(monthString)
    router.replace('/guide')
  }

  return (
    <GuideMonthList
      selectedGuideMonth={selectedGuideMonth}
      onMonthClick={onMonthClick}
    />
  )
}
