import { View } from 'react-native'
import { useRouter } from 'solito/router'
import * as Burnt from 'burnt'
import { CheckCircleIcon } from 'react-native-heroicons/outline'

// Components
import GuideCard from './components/guide-card'
import GuideMonthButton from './components/guide-month-button'
import GuideErrorCard from './components/guide-error-card'
import { ToasterWebComponent } from '../../components/toaster-container.web'

// Contexts
import { useReadPassageContext } from '../read/contexts/read-passage.context'

// Queries
import { useGuideByMonthQuery } from '../../hooks/use-guide-query'

// Utils
import dayjs from '../../utils/dayjs'

export default function GuideScreen() {
  const router = useRouter()
  const {
    selectedGuideMonth,
    setGuidedEnable,
    setGuidedDate,
    setGuidedSelectedPassage,
    setSelectedBibleVersion,
  } = useReadPassageContext()

  // Queries
  const { data, isLoading, isError } = useGuideByMonthQuery(selectedGuideMonth)

  // Methods
  const getGuideHasBeenRead = (date: string) => {
    return localStorage.getItem(`read-${date}`) !== null
  }

  const onGuideClick = (date: string) => {
    setGuidedEnable(true)
    setGuidedDate(date)
    setGuidedSelectedPassage('pl-1')
    setSelectedBibleVersion('tb')
    router.push('/read')
  }

  const onCheckMarkClick = (date: string) => {
    Burnt.toast({
      preset: 'done',
      // @ts-ignore
      title: (
        <ToasterWebComponent
          icon={
            <CheckCircleIcon
              size={24}
              className="text-emerald-900 dark:text-white"
            />
          }
          title="Panduan Telah Dibaca"
          message={dayjs(date, 'DD-MM-YYYY').format('DD MMMM YYYY')}
        />
      ),
    })
  }

  return (
    <View className="pb-28">
      <GuideMonthButton />

      <View className="mt-4 gap-4">
        {isError ? (
          <GuideErrorCard />
        ) : isLoading ? (
          [...Array(3).keys()].map((_, i) => <GuideCard key={i} isLoading />)
        ) : (
          data!.map((item, index) => (
            <GuideCard
              key={index}
              item={item}
              isActive={item.date === dayjs().format('DD-MM-YYYY')}
              isRead={getGuideHasBeenRead(item.date!)}
              onGuideClick={onGuideClick}
              onCheckMarkClick={onCheckMarkClick}
            />
          ))
        )}
      </View>
    </View>
  )
}
