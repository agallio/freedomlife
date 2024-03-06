import { type PropsWithChildren } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta) {
        console.log(query.meta.errorMessage, error)
        return
      }

      console.log(error)
    },
  }),
})

/**
 * Web only!
 * Without Sentry. (cost saving)
 */
export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
