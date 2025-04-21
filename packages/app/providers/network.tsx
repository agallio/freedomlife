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
