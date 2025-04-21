import { useColorScheme } from 'react-native'
import { Tabs, useRouter } from 'expo-router'

// Components
import BottomTab from '@repo/app/components/bottom-tab'
import ReadNavbar from '@repo/app/features/read/components/read-navbar'

// Icon Component
import FreedomlifeIcon from '@repo/app/components/icons/freedomlife-icon'

// Utils
import { useSafeArea } from '@repo/app/utils/hooks/use-safe-area'

export default function TabLayout() {
  const { top } = useSafeArea()
  const router = useRouter()
  const colorScheme = useColorScheme()

  // Methods
  const redirectToPassageScreen = () => {
    router.push('/passage')
  }

  const redirectToTranslateScreen = () => {
    router.push('/translate')
  }

  return (
    <Tabs tabBar={(props) => <BottomTab {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          headerTitle: () => (
            <FreedomlifeIcon style={{ width: 180, height: '100%' }} />
          ),
          headerStyle: {
            height: top + 50,
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === 'light' ? '#e6e6e6' : '#374151',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="read"
        options={{
          title: 'Baca',
          header: () => (
            <ReadNavbar
              redirectToPassageScreen={redirectToPassageScreen}
              redirectToTranslateScreen={redirectToTranslateScreen}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: 'Panduan',
          headerTitle: () => (
            <FreedomlifeIcon style={{ width: 180, height: '100%' }} />
          ),
          headerStyle: {
            height: top + 50,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>
  )
}
