import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Types
import type { PropsWithChildren } from 'react'

export const queryClient = new QueryClient()

export const QueryProvider = ({ children }: PropsWithChildren<{}>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
