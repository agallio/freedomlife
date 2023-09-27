import { useEffect, useRef, useState } from 'react'
import { AppState, Platform } from 'react-native'
import { focusManager } from '@tanstack/react-query'

// Providers
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import { FontsProvider } from './fonts'
import { QueryProvider } from './query'
import { NetworkConnectionProvider } from './network'
import { ReadContextProvider } from 'app/features/read'

export function Provider({ children }: { children: React.ReactNode }) {
  const appState = useRef(AppState.currentState)
  const [, setAppStateVisible] = useState(appState.current)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (Platform.OS !== 'web') {
        appState.current = nextAppState
        setAppStateVisible(appState.current)
        focusManager.setFocused(nextAppState === 'active')
      }
    })
    return () => subscription.remove()
  }, [])

  return (
    <NavigationProvider>
      <FontsProvider>
        <Dripsy>
          <QueryProvider>
            <NetworkConnectionProvider>
              <ReadContextProvider>{children}</ReadContextProvider>
            </NetworkConnectionProvider>
          </QueryProvider>
        </Dripsy>
      </FontsProvider>
    </NavigationProvider>
  )
}
