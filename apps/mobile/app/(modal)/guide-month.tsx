import { useRouter } from 'expo-router'

// Components
import GuideMonthList from '@repo/app/features/guide/components/guide-month-list'

// Contexts
import { useReadPassageContext } from '@repo/app/features/read/contexts/read-passage.context'

export default function GuideMonthScreen() {
  const router = useRouter()
  const { selectedGuideMonth, setSelectedGuideMonth } = useReadPassageContext()

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
