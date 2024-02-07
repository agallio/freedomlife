import React, { PropsWithChildren, useMemo, useRef } from 'react'
import { Platform, useColorScheme, useWindowDimensions } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'

// Constants
import { apiUrl } from '../../utils/constants'

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

const pageList = {
  home: '/',
  read: '/read',
  translate: '/read?m=translate',
  passage: '/read?m=passage',
  setting: '/read?m=setting',
  guide: '/guide',
}
const iosUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
const androidUserAgent =
  'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36'

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
  const { width, height } = useWindowDimensions()

  const trackScreenView = async (url: string) => {
    const hostname = `${
      Platform.OS === 'ios' ? 'ios' : 'android'
    }.freedomlife.id`

    try {
      await axios.post(
        `${apiUrl}/api/umami/send`,
        {
          hostname,
          referrer: `https://${hostname}`,
          screen: `${width.toFixed()}x${height.toFixed()}`,
          url,
        },
        {
          headers: {
            'User-Agent':
              Platform.OS === 'ios' ? iosUserAgent : androidUserAgent,
          },
        },
      )
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.log(e)
      }
    }
  }

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
        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef.getCurrentRoute()?.name

        if (previousRouteName !== currentRouteName) {
          routeNameRef.current = currentRouteName

          if (currentRouteName) {
            trackScreenView(pageList[currentRouteName])
          }
        }
      }}
    >
      {children}
      <StatusBar />
    </NavigationContainer>
  )
}
