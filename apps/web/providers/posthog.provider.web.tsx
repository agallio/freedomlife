import { PropsWithChildren } from 'react'
import { PostHogProvider } from 'posthog-js/react'

export default function PostHogProviderWeb({
  client,
  children,
}: PropsWithChildren<{ client?: any }>) {
  return <PostHogProvider client={client}>{children}</PostHogProvider>
}
