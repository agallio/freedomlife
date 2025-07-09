import { PropsWithChildren } from 'react'
import { PostHogProvider, usePostHog } from 'posthog-react-native'

// Contexts
import EventTrackingProvider, {
  type EventTrackingContextType,
} from '@repo/app/providers/event-tracking'

export default function PostHogProviderNative({
  apiKey,
  navigationRef,
  children,
}: PropsWithChildren<{ apiKey: string; navigationRef: any }>) {
  return (
    <PostHogProvider
      apiKey={apiKey}
      autocapture={{ captureScreens: true, navigationRef }}
      options={{
        host: 'https://eu.i.posthog.com',
        disabled: process.env.NODE_ENV !== 'production',
      }}
    >
      <EventTrackingWrapper>{children}</EventTrackingWrapper>
    </PostHogProvider>
  )
}

function EventTrackingWrapper({ children }: PropsWithChildren) {
  const posthog = usePostHog()

  const captureEvent: EventTrackingContextType['captureEvent'] = (
    eventName,
    properties,
  ) => {
    posthog.capture(eventName, properties)
  }

  return (
    <EventTrackingProvider captureEvent={captureEvent}>
      {children}
    </EventTrackingProvider>
  )
}
