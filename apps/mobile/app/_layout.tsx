import '../global.css'

import { useEffect, useRef, useState } from 'react'
import {
  AppState,
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import { isRunningInExpoGo } from 'expo'
import {
  SplashScreen,
  Stack,
  useNavigationContainerRef,
  useRouter,
} from 'expo-router'
import { useFonts } from 'expo-font'
import { ThemeProvider } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SystemBars } from 'react-native-edge-to-edge'
import { focusManager } from '@tanstack/react-query'
import * as Sentry from '@sentry/react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// Contexts
import PostHogProviderNative from '../providers/posthog.provider.mobile'
import { NetworkConnectionMobileProvider } from '@repo/app/providers/network'
import QueryProvider from '@repo/app/providers/react-query'
import ReadProviders from '@repo/app/features/read/contexts'
import { SavedFiltersProvider } from '@repo/app/features/saved/contexts/saved-filters.context'
import { SavedVersesProvider } from '@repo/app/features/saved/contexts/saved-verses.context'
import { ReadLocalDatabaseMobileProvider } from '@repo/app/features/read/local-databases/mobile/index.mobile'
import { SheetsMobileProvider } from '@repo/app/providers/bottom-sheet/index.mobile'
import { FeatureFlagsProvider } from '@repo/app/providers/feature-flags'

// Queries
import { useFlagQuery } from '@repo/app/hooks/use-flag-query'

// Utils
import { getIconColor } from '@repo/app/utils/helpers'
import { CustomDarkTheme, CustomLightTheme } from '../utils/expo-router-theme'

// SplashScreen Prevent Auto Hide
SplashScreen.preventAutoHideAsync()

// Constants - Sentry
const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
})

Sentry.init({
  dsn: 'https://c1e9f087d60a52f27ec5aeb02770f888@o4506743482744832.ingest.sentry.io/4506743485759488',
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
  enableTracing: false,
  enableNative: true,
  integrations: [navigationIntegration],
  ignoreErrors: [/Network Error/i],
  enableNativeFramesTracking: !isRunningInExpoGo(),
})

function RootLayout() {
  const [loaded, error] = useFonts({
    inter: require('../assets/fonts/inter-regular.ttf'),
    'inter-bold': require('../assets/fonts/inter-bold.ttf'),
    'inter-light': require('../assets/fonts/inter-light.ttf'),
    'inter-medium': require('../assets/fonts/inter-medium.ttf'),
    'inter-semibold': require('../assets/fonts/inter-semibold.ttf'),
  })
  const colorScheme = useColorScheme()

  // Refs
  const navigationRef = useNavigationContainerRef()
  const appState = useRef(AppState.currentState)

  // States
  const [, setAppStateVisible] = useState(appState.current)

  // Effects
  useEffect(() => {
    if (loaded || error) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  useEffect(() => {
    // Register expo-router navigationRef to Sentry.
    if (navigationRef) {
      navigationIntegration.registerNavigationContainer(navigationRef)
    }
  }, [navigationRef])

  useEffect(() => {
    // Listen to AppState changes.
    const appStateSubscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (Platform.OS !== 'web') {
          appState.current = nextAppState
          setAppStateVisible(appState.current)
          focusManager.setFocused(nextAppState === 'active')
        }
      },
    )

    return () => appStateSubscription.remove()
  }, [])

  // Prevent rendering until the font has loaded or an error was returned.
  if (!loaded && !error) {
    return null
  }

  return (
    <PostHogProviderNative
      apiKey={(process.env as any).EXPO_PUBLIC_POSTHOG_KEY!}
      navigationRef={navigationRef}
    >
      <View
        className="flex-1"
        style={{
          backgroundColor:
            colorScheme === 'light'
              ? CustomLightTheme.colors.background
              : CustomDarkTheme.colors.background,
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryProvider>
            <RootLayoutComponent />
            <SystemBars style="auto" />
          </QueryProvider>
        </GestureHandlerRootView>
      </View>
    </PostHogProviderNative>
  )
}

function RootLayoutComponent() {
  const colorScheme = useColorScheme()
  const router = useRouter()

  const redirectToReadScreen = () => {
    router.push('/read')
  }

  // Queries
  const { data: tsiFlagData, isLoading: tsiFlagLoading } = useFlagQuery({
    name: 'feature_tsi_translation',
    enabled: true,
  })

  return (
    <ReadProviders>
      <SavedVersesProvider>
        <SavedFiltersProvider>
          <ReadLocalDatabaseMobileProvider>
            <BottomSheetModalProvider>
              <NetworkConnectionMobileProvider
                redirectToReadScreen={redirectToReadScreen}
              >
                <SheetsMobileProvider>
                  <FeatureFlagsProvider
                    featureFlags={{
                      feature_tsi_translation: {
                        data: tsiFlagData,
                        isLoading: tsiFlagLoading,
                      },
                    }}
                  >
                    <ThemeProvider
                      value={
                        colorScheme === 'dark'
                          ? CustomDarkTheme
                          : CustomLightTheme
                      }
                    >
                      <Stack>
                        {/* Tabs */}
                        <Stack.Screen
                          name="(tabs)"
                          options={{ title: 'Beranda', headerShown: false }}
                        />

                        {/* Stacks */}
                        <Stack.Screen
                          name="(modal)/passage"
                          options={{
                            title: 'Pilih Kitab',
                            presentation:
                              Platform.OS === 'ios' && Platform.isPad
                                ? 'modal'
                                : undefined,
                            headerBackTitle: 'Kembali',
                            headerTintColor: getIconColor(colorScheme),
                            animation:
                              Platform.OS === 'android'
                                ? 'fade_from_bottom'
                                : undefined,
                          }}
                        />

                        {/* Modals */}
                        <Stack.Screen
                          name="(modal)/translate"
                          options={{
                            presentation: 'modal',
                            title: 'Pilih Terjemahan',
                            headerTintColor: getIconColor(colorScheme),
                            animation:
                              Platform.OS === 'android'
                                ? 'fade_from_bottom'
                                : undefined,
                            headerLeft: () =>
                              Platform.OS === 'ios' ? (
                                <TouchableOpacity onPress={() => router.back()}>
                                  <Text className="text-base text-emerald-900 dark:text-white">
                                    Kembali
                                  </Text>
                                </TouchableOpacity>
                              ) : undefined,
                          }}
                        />
                        <Stack.Screen
                          name="(modal)/passage-chapter"
                          options={{
                            presentation: 'modal',
                            title: 'Pilih Pasal',
                            headerBackTitle: 'Kembali',
                            headerTintColor: getIconColor(colorScheme),
                            headerLeft: () =>
                              Platform.OS === 'ios' ? (
                                <TouchableOpacity onPress={() => router.back()}>
                                  <Text className="text-base text-emerald-900 dark:text-white">
                                    Kembali
                                  </Text>
                                </TouchableOpacity>
                              ) : undefined,
                            animation:
                              Platform.OS === 'android'
                                ? 'fade_from_bottom'
                                : undefined,
                          }}
                        />
                        <Stack.Screen
                          name="(modal)/guide-month"
                          options={{
                            presentation: 'modal',
                            title: 'Pilih Bulan Panduan',
                            headerTintColor: getIconColor(colorScheme),
                            animation:
                              Platform.OS === 'android'
                                ? 'fade_from_bottom'
                                : undefined,
                          }}
                        />
                      </Stack>
                    </ThemeProvider>
                  </FeatureFlagsProvider>
                </SheetsMobileProvider>
              </NetworkConnectionMobileProvider>
            </BottomSheetModalProvider>
          </ReadLocalDatabaseMobileProvider>
        </SavedFiltersProvider>
      </SavedVersesProvider>
    </ReadProviders>
  )
}

export default Sentry.wrap(RootLayout)
