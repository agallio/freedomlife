import { Platform, View, useColorScheme } from 'react-native'
import { ChevronDownIcon } from 'react-native-heroicons/solid'

// Components
import ListItem from '../../../components/list-item'
import { Text } from '../../../components/text'

// Contexts
import { useGuideModalsContext } from '../contexts/guide-modals.context'
import { useReadPassageContext } from '../../read/contexts/read-passage.context'

// Utils
import dayjs from '../../../utils/dayjs'

export default function GuideMonthButton({
  redirectToGuideMonthScreen,
}: {
  redirectToGuideMonthScreen: () => void
}) {
  const colorScheme = useColorScheme()
  const { setOpenGuideMonth } = useGuideModalsContext()
  const { selectedGuideMonth } = useReadPassageContext()

  return (
    <ListItem
      onClick={() => {
        if (Platform.OS === 'web') {
          setOpenGuideMonth(true)
          return
        }

        redirectToGuideMonthScreen()
      }}
    >
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-gray-900 dark:text-white">
          {dayjs(selectedGuideMonth, 'MM').format('MMMM')}
        </Text>
        <ChevronDownIcon
          size={20}
          color={
            Platform.OS !== 'web'
              ? colorScheme === 'light'
                ? '#111827'
                : '#ffffff'
              : undefined
          }
          className={
            Platform.OS === 'web'
              ? 'text-emerald-900 dark:text-white'
              : undefined
          }
        />
      </View>
    </ListItem>
  )
}
