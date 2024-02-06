import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Types
import type { PropsWithChildren } from 'react'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta) {
        console.log(query.meta?.errorMessage, error)
        return
      }

      console.log(error)
    },
  }),
})

export const QueryProvider = ({ children }: PropsWithChildren<{}>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
