import React, { PropsWithChildren, useMemo, useRef } from 'react'
import { useColorScheme } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { StatusBar } from 'expo-status-bar'

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6ee7b7',
    background: '#f3f4f6',
    card: '#f3f4f6',
  },
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#047857',
    background: '#1f2937',
    card: '#1f2937',
  },
}

export function NavigationProvider({ children }: PropsWithChildren<{}>) {
  const routeNameRef = useRef<string | undefined>('')
  const navigationRef = useNavigationContainerRef<{
    root: undefined
    translate: undefined
    passage: undefined
    passageChapter: { passage: string }
    setting: undefined
    guideMonth: undefined
  }>()
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'root',
            screens: {
              root: '',
              home: '/home',
              read: '/read',
              translate: '/translate',
              passage: '/passage',
              passageChapter: '/passageChapter/:passage',
              setting: '/setting',
              guide: '/guide',
              guideMonth: '/guide/month',
              'user-detail': 'user/:id',
            },
          },
        }),
        [],
      )}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.getCurrentRoute()?.name
        routeNameRef.current = currentRouteName
      }}
    >
      {children}
      <StatusBar />
    </NavigationContainer>
  )
}
