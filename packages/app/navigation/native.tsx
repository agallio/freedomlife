import { Platform, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSx } from 'dripsy'

// Components
import BottomTabBar from 'app/components/BottomTabBar/BottomTabBar'
import FreedomLifeIcon from 'app/components/Icons/FreedomLifeIcon'

// Screen & Features
import HomeScreen from 'app/features/home'
import ReadScreen, {
  ReadScreenToolbar,
  TranslateScreen,
  PassageScreen,
  PassageChapterScreen,
  SettingScreen,
} from 'app/features/read'
import GuideScreen, { GuideMonthScreen } from 'app/features/guide'

// Contexts
import { useReadPassageContext } from 'app/features/read/contexts/ReadPassageContext'

// Hooks
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

const Stack = createNativeStackNavigator<{
  root: undefined
  translate: undefined
  passage: undefined
  passageChapter: { passage: string }
  setting: undefined
  guideMonth: undefined
}>()
const Tab = createBottomTabNavigator()

function RootTabs() {
  const sx = useSx()
  const colorScheme = useColorScheme()
  const { top } = useSafeArea()

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Beranda',
          headerShown: true,
          headerTitle: () => (
            <FreedomLifeIcon style={{ width: 180, height: '100%' }} />
          ),
          headerStyle: sx({
            height: top + 70,
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === 'light' ? '#e6e6e6' : '#374151',
          }),
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="read"
        component={ReadScreen}
        options={{
          title: 'Baca',
          headerShown: true,
          unmountOnBlur: true,
          header: () => (
            <ReadScreenToolbar top={top} colorScheme={colorScheme} />
          ),
        }}
      />
      <Tab.Screen
        name="guide"
        component={GuideScreen}
        options={{
          title: 'Panduan',
          headerShown: true,
          unmountOnBlur: true,
          headerTitle: () => (
            <FreedomLifeIcon style={{ width: 180, height: '100%' }} />
          ),
          headerStyle: sx({
            height: top + 70,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            // borderBottomWidth: 1,
            // borderBottomColor: colorScheme === 'light' ? '#e6e6e6' : '#374151',
          }),
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  )
}

export function NativeNavigation() {
  const colorScheme = useColorScheme()

  // Contexts
  const { guidePassage } = useReadPassageContext()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="root"
        component={RootTabs}
        options={{ title: 'Beranda' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="translate"
          component={TranslateScreen}
          options={{
            title: 'Pilih Terjemahan',
            headerShown: true,
            animation:
              Platform.OS === 'android' ? 'fade_from_bottom' : undefined,
          }}
        />
        <Stack.Screen
          name="passageChapter"
          component={PassageChapterScreen}
          options={{
            title: 'Pilih Pasal',
            headerShown: true,
            animation:
              Platform.OS === 'android' ? 'fade_from_bottom' : undefined,
          }}
        />
        <Stack.Screen
          name="setting"
          component={SettingScreen}
          options={{
            title: 'Pengaturan',
            headerShown: true,
            animation:
              Platform.OS === 'android' ? 'fade_from_bottom' : undefined,
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="passage"
        component={PassageScreen}
        options={{
          title: guidePassage ? 'Pilih Panduan Baca' : 'Pilih Kitab',
          headerShown: true,
          animation: Platform.OS === 'android' ? 'fade_from_bottom' : undefined,
          headerTintColor: colorScheme === 'light' ? '#000' : '#fff',
        }}
      />
      <Stack.Screen
        name="guideMonth"
        component={GuideMonthScreen}
        options={{
          title: 'Pilih Panduan Bulan',
          headerShown: true,
          presentation: 'modal',
          animation: Platform.OS === 'android' ? 'fade_from_bottom' : undefined,
        }}
      />
    </Stack.Navigator>
  )
}
