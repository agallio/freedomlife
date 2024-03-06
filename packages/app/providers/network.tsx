import {
  createContext,
  useState,
  useEffect,
  useContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

const NetworkConnectionContext = createContext<{
  isOffline: boolean
  openOfflineModal: boolean
  setIsOffline: Dispatch<SetStateAction<boolean>>
  setOpenOfflineModal: Dispatch<SetStateAction<boolean>>
}>({
  isOffline: false,
  openOfflineModal: false,
  setIsOffline: () => {},
  setOpenOfflineModal: () => {},
})

/**
 * App only! (iOS + Android)
 */
export function NetworkConnectionContextProvider({
  children,
}: PropsWithChildren) {
  const [isOffline, setIsOffline] = useState(false)
  const [openOfflineModal, setOpenOfflineModal] = useState(false)

  // Effects
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      if (state.isInternetReachable !== null) {
        const offline = !(
          state.isConnected && state.isInternetReachable === true
        )
        setIsOffline(offline)
        setOpenOfflineModal(offline)
        // react-query already supports on reconnect auto refetch in web browser
        onlineManager.setOnline(!offline)
      }
    })

    return () => removeNetInfoSubscription()
  }, [])

  return (
    <NetworkConnectionContext.Provider
      value={{ isOffline, openOfflineModal, setOpenOfflineModal, setIsOffline }}
    >
      {children}
    </NetworkConnectionContext.Provider>
  )
}

export function useNetworkConnectionContext() {
  const value = useContext(NetworkConnectionContext)

  if (!value) {
    throw new Error(
      'useNetworkConnectionContext must be used within a NetworkConnectionContextProvider',
    )
  }

  return value
}
