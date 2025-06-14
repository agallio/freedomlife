import {
  createContext,
  useState,
  useEffect,
  useContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'
import * as Network from 'expo-network'
import { onlineManager } from '@tanstack/react-query'

// Components
import NoInternetModal from '../features/home/components/no-internet.mobile'

const NetworkConnectionMobileContext = createContext<{
  isOffline: boolean
  setIsOffline: Dispatch<SetStateAction<boolean>>
}>({
  isOffline: false,
  setIsOffline: () => {},
})

/**
 * App only! (iOS + Android)
 */
export function NetworkConnectionMobileProvider({
  children,
  redirectToReadScreen,
}: PropsWithChildren<{ redirectToReadScreen: () => void }>) {
  const [isOffline, setIsOffline] = useState(false)
  const [openOfflineModal, setOpenOfflineModal] = useState(false)

  // Effects
  useEffect(() => {
    const networkSubscription = Network.addNetworkStateListener((state) => {
      const isConnected = state.isConnected !== null && state.isConnected
      const isInternetReachable = Boolean(state.isInternetReachable)
      const offline = !isConnected || !isInternetReachable

      setIsOffline(offline)
      setOpenOfflineModal(offline)
      onlineManager.setOnline(!offline)
    })

    return () => {
      networkSubscription.remove()
    }
  }, [])

  return (
    <NetworkConnectionMobileContext.Provider
      value={{ isOffline, setIsOffline }}
    >
      {children}

      <NoInternetModal
        openOfflineModal={openOfflineModal}
        setOpenOfflineModal={setOpenOfflineModal}
        redirectToReadScreen={redirectToReadScreen}
      />
    </NetworkConnectionMobileContext.Provider>
  )
}

export function useNetworkConnectionMobileContext() {
  const value = useContext(NetworkConnectionMobileContext)

  if (!value) {
    throw new Error(
      'useNetworkConnectionMobileContext must be used within a NetworkConnectionMobileProvider',
    )
  }

  return value
}
