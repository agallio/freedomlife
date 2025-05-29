import { PropsWithChildren } from 'react'
import { PostHogProvider, usePostHog } from 'posthog-js/react'

// Contexts
import EventTrackingProvider, {
  type EventTrackingContextType,
} from '@repo/app/providers/event-tracking'

export default function PostHogProviderWeb({
  client,
  children,
}: PropsWithChildren<{ client?: any }>) {
  return (
    <PostHogProvider client={client}>
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
