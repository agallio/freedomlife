import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

interface ContextState {
  isOffline: boolean
}

interface ContextValue extends ContextState {
  setOffline: (_: boolean) => void
}

const initialState: ContextState = {
  isOffline: false,
}

const Context = createContext<ContextValue>({
  ...initialState,
  setOffline: () => {},
})

/** App (iOS + Android) Only. */
export function NetworkConnectionProvider({ children }: PropsWithChildren<{}>) {
  const [{ isOffline }, setState] = useState<ContextState>(initialState)

  const setOffline = (isOffline: boolean) => setState({ isOffline })

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      if (state.isInternetReachable !== null) {
        const offline = !(
          state.isConnected && state.isInternetReachable === true
        )
        setOffline(offline)
        // react-query already supports on reconnect auto refetch in web browser
        onlineManager.setOnline(!offline)
      }
    })

    return () => removeNetInfoSubscription()
  }, [])

  return (
    <Context.Provider value={{ isOffline, setOffline }}>
      {children}
    </Context.Provider>
  )
}

/** App (iOS + Android) Only. */
export function useNetworkConnectionContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error(
      'useNetworkConnectionContext must be used within a NetworkConnectionContext'
    )
  }
  return context
}
