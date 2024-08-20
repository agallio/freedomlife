import '../global.css'

import { useEffect, useRef, useState } from 'react'
import {
  AppState,
  Platform,
  TouchableOpacity,
  Text,
  useColorScheme,
} from 'react-native'
import {
  SplashScreen,
  Stack,
  useNavigationContainerRef,
  useRouter,
} from 'expo-router'
import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import * as Updates from 'expo-updates'
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { focusManager } from '@tanstack/react-query'
import * as Sentry from '@sentry/react-native'

// Contexts
import PostHogProviderNative from '@repo/app/providers/posthog/index'
import { NetworkConnectionContextProvider } from '@repo/app/providers/network'
import QueryProvider from '@repo/app/providers/react-query'
import ReadProviders from '@repo/app/features/read/contexts'
import { ReadLocalDatabaseNativeProvider } from '@repo/app/features/read/local-databases/native/index.native'
import BottomSheetNativeProvider from '@repo/app/providers/bottom-sheet/index.native'

// Utils
import { getIconColor } from '@repo/app/utils/helpers'

// Constants - Themes
const fonts = {
  regular: {
    fontFamily: 'inter',
  },
  medium: {
    fontFamily: 'inter-medium',
  },
  bold: {
    fontFamily: 'inter-bold',
  },
  heavy: {
    fontFamily: 'inter-bold',
  },
}

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6ee7b7',
    background: '#f3f4f6',
    card: '#f3f4f6',
  },
  fonts: Platform.OS !== 'web' ? fonts : undefined,
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#047857',
    background: '#1f2937',
    card: '#1f2937',
  },
  fonts: Platform.OS !== 'web' ? fonts : undefined,
}

// Constants - Sentry
const sentryRoutingInstrumentation = new Sentry.ReactNavigationInstrumentation()
const manifest = Updates.manifest
const metadata = 'metadata' in manifest ? manifest.metadata : undefined
const extra = 'extra' in manifest ? manifest.extra : undefined
const updateGroup =
  metadata && 'updateGroup' in metadata ? metadata.updateGroup : undefined

Sentry.init({
  dsn: 'https://c1e9f087d60a52f27ec5aeb02770f888@o4506743482744832.ingest.sentry.io/4506743485759488',
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
  enableTracing: false,
  enableNative: true,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation: sentryRoutingInstrumentation,
    }),
  ],
  ignoreErrors: [/Network Error/i],
})

// Add additional scope to sentry error tags.
// https://docs.expo.dev/guides/using-sentry/#do-you-want-to-append-additional-update-related
Sentry.configureScope((scope) => {
  scope.setTag('expo-update-id', Updates.updateId)
  scope.setTag('expo-is-embedded-update', Updates.isEmbeddedLaunch)

  if (typeof updateGroup === 'string') {
    scope.setTag('expo-update-group-id', updateGroup)

    const owner = extra?.expoClient?.owner ?? '[account]'
    const slug = extra?.expoClient?.slug ?? '[project]'
    scope.setTag(
      'expo-update-debug-url',
      `https://expo.dev/accounts/${owner}/projects/${slug}/updates/${updateGroup}`,
    )
  } else if (Updates.isEmbeddedLaunch) {
    // This will be `true` if the update is the one embedded in the build, and not one downloaded from the updates server.
    scope.setTag('expo-update-debug-url', 'not applicable for embedded updates')
  }
})

// SplashScreen Prevent Auto Hide
SplashScreen.preventAutoHideAsync()

function RootLayout() {
  const colorScheme = useColorScheme()
  const router = useRouter()
  const [loaded, error] = useFonts({
    inter: require('../assets/fonts/inter-regular.ttf'),
    'inter-bold': require('../assets/fonts/inter-bold.ttf'),
    'inter-light': require('../assets/fonts/inter-light.ttf'),
    'inter-medium': require('../assets/fonts/inter-medium.ttf'),
    'inter-semibold': require('../assets/fonts/inter-semibold.ttf'),
  })

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
    // Android only: change navigation bar color.
    if (colorScheme) {
      if (Platform.OS === 'android') {
        NavigationBar.setBackgroundColorAsync(
          colorScheme === 'dark' ? '#1f2937' : '#f3f4f6',
        )
      }
    }
  }, [colorScheme])

  useEffect(() => {
    // Register expo-router navigationRef to Sentry.
    if (navigationRef) {
      sentryRoutingInstrumentation.registerNavigationContainer(navigationRef)
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
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryProvider>
          <NetworkConnectionContextProvider>
            <ReadLocalDatabaseNativeProvider>
              <ThemeProvider
                value={
                  colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme
                }
              >
                <ReadProviders>
                  <BottomSheetNativeProvider>
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
                  </BottomSheetNativeProvider>
                </ReadProviders>
              </ThemeProvider>
            </ReadLocalDatabaseNativeProvider>
          </NetworkConnectionContextProvider>
        </QueryProvider>
      </GestureHandlerRootView>
    </PostHogProviderNative>
  )
}

export default Sentry.wrap(RootLayout)
