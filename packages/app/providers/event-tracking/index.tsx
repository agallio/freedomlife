import { createContext, useContext, type PropsWithChildren } from 'react'

export const EVENT_NAMES = {
  SET_BIBLE_VERSION: 'set_bible_version',
} as const

export type EventTrackingContextType = {
  captureEvent: (
    _eventName: (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES],
    _properties?: Record<string, string>,
  ) => void
}

const EventTrackingContext = createContext<EventTrackingContextType>({
  captureEvent: () => {},
})

export default function EventTrackingProvider({
  captureEvent,
  children,
}: PropsWithChildren<{
  captureEvent: EventTrackingContextType['captureEvent']
}>) {
  return (
    <EventTrackingContext.Provider value={{ captureEvent }}>
      {children}
    </EventTrackingContext.Provider>
  )
}

export function useEventTrackingContext() {
  const value = useContext(EventTrackingContext)

  if (!value) {
    console.log(
      'useEventTrackingContext must be used within a EventTrackingProvider',
    )
  }

  return value
}
