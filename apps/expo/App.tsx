import * as Sentry from '@sentry/react-native'
import * as Updates from 'expo-updates'

// Providers
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'

// Sentry
const manifest = Updates.manifest
const metadata = 'metadata' in manifest ? manifest.metadata : undefined
const extra = 'extra' in manifest ? manifest.extra : undefined
const updateGroup =
  metadata && 'updateGroup' in metadata ? metadata.updateGroup : undefined

Sentry.init({
  dsn: 'https://c1e9f087d60a52f27ec5aeb02770f888@o4506743482744832.ingest.sentry.io/4506743485759488',
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.5,
  enableNative: true,
})

// Add additional scope to sentry error tags.
// https://docs.expo.dev/guides/using-sentry/#do-you-want-to-append-additional-update-related
Sentry.configureScope((scope) => {
  scope.setTag('expo-update-id', Updates.updateId)
  scope.setTag('expo-is-embedded-update', Updates.isEmbeddedLaunch)

  if (typeof updateGroup === 'string') {
    scope.setTag('expo-update-group-id', updateGroup)

    const owner = extra?.expoClient?.owner ?? '[account]'
    const slug = extra?.expoClient?.slug ?? '[project]'
    scope.setTag(
      'expo-update-debug-url',
      `https://expo.dev/accounts/${owner}/projects/${slug}/updates/${updateGroup}`,
    )
  } else if (Updates.isEmbeddedLaunch) {
    // This will be `true` if the update is the one embedded in the build, and not one downloaded from the updates server.
    scope.setTag('expo-update-debug-url', 'not applicable for embedded updates')
  }
})

// App
function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}

export default Sentry.wrap(App)
