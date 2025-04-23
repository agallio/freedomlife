import { PropsWithChildren } from 'react'
import { PostHogProvider } from 'posthog-react-native'

export default function PostHogProviderNative({
  apiKey,
  children,
}: PropsWithChildren<{ apiKey: string }>) {
  return (
    <PostHogProvider
      apiKey={apiKey}
      options={{
        host: 'https://eu.i.posthog.com',
        disabled: process.env.NODE_ENV !== 'production',
      }}
    >
      {children}
    </PostHogProvider>
  )
}
