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

const NetworkConnectionContext = createContext<{
  isOffline: boolean
  setIsOffline: Dispatch<SetStateAction<boolean>>
}>({
  isOffline: false,
  setIsOffline: () => {},
})

/**
 * App only! (iOS + Android)
 */
export function NetworkConnectionNativeProvider({
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
    <NetworkConnectionContext.Provider value={{ isOffline, setIsOffline }}>
      {children}

      <NoInternetModal
        openOfflineModal={openOfflineModal}
        setOpenOfflineModal={setOpenOfflineModal}
        redirectToReadScreen={redirectToReadScreen}
      />
    </NetworkConnectionContext.Provider>
  )
}

export function useNetworkConnectionContext() {
  const value = useContext(NetworkConnectionContext)

  if (!value) {
    throw new Error(
      'useNetworkConnectionContext must be used within a NetworkConnectionNativeProvider',
    )
  }

  return value
}
