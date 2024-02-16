import { useAptabase } from '@aptabase/react-native'

export function useAnalytics() {
  const { trackEvent: aptabaseTrackEvent } = useAptabase()

  const trackEvent: typeof aptabaseTrackEvent = (eventName, props) => {
    if (process.env.NODE_ENV === 'production') {
      aptabaseTrackEvent(eventName, props)
    }
  }

  return { trackEvent }
}
