import { useColorScheme } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import { ArchiveBoxArrowDownIcon, CogIcon } from 'react-native-heroicons/solid'

// Components
import BottomTab from '@repo/app/components/bottom-tab'
import ReadNavbar from '@repo/app/features/read/components/read-navbar'
import { IconButton } from '@repo/app/components/button'

// Icon Component
import FreedomlifeIcon from '@repo/app/components/icons/freedomlife-icon'

// Utils
import { useSafeArea } from '@repo/app/utils/hooks/use-safe-area'
import { getIconColor } from '@repo/app/utils/helpers'
import { useSavedManageSheetActionsMobileContext } from '@repo/app/providers/bottom-sheet/saved-manage-bottom-sheet/saved-manage-bottom-sheet.mobile'

export default function TabLayout() {
  const { top } = useSafeArea()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const { showSavedManageSheet } = useSavedManageSheetActionsMobileContext()

  // Constant
  const color = getIconColor(colorScheme)

  // Methods
  const redirectToPassageScreen = () => {
    router.push('/passage')
  }

  const redirectToTranslateScreen = () => {
    router.push('/translate')
  }

  const openSavedManageSheet = () => {
    showSavedManageSheet()
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
            shadowOpacity: 0,
            elevation: 0,
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
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Tersimpan',
          headerTitle: () => (
            <FreedomlifeIcon style={{ width: 180, height: '100%' }} />
          ),
          headerRight: () => (
            <IconButton
              ariaLabel="Tombol pengaturan"
              variant="transparent"
              className="pr-6 sm:pr-10"
              icon={<ArchiveBoxArrowDownIcon size={24} color={color} />}
              onClick={openSavedManageSheet}
            />
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
