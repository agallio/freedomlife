import { useEffect, type ComponentProps, type PropsWithChildren } from 'react'
import { AptabaseProvider } from '@aptabase/react-native'

// Utils
import { useAnalytics } from '../utils/hooks/use-analytics.native'

const routeMapping = {
  '/': 'home',
  '/read': 'read',
  '/translate': 'translate',
  '/passage': 'passage',
  '/passage-chapter': 'passageChapter',
  '/setting': 'setting',
  '/guide': 'guide',
  '/guide-month': 'guideMonth',
}

export function AptabaseRootProvider({
  children,
  ...rest
}: PropsWithChildren<ComponentProps<typeof AptabaseProvider>>) {
  return <AptabaseProvider {...rest}>{children}</AptabaseProvider>
}

export function AptabaseScreenTrackingProvider({
  pathname,
  params,
  children,
}: PropsWithChildren<{
  pathname: string
  params: Partial<Record<string, string | string[]>>
}>) {
  const { trackEvent } = useAnalytics()

  // Effcts
  useEffect(() => {
    const screenName = routeMapping[pathname as keyof typeof routeMapping]

    if (screenName) {
      trackEvent(screenName)
    }
  }, [pathname, params])

  return children
}
