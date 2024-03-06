import { type PropsWithChildren } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { captureException } from '@sentry/react-native'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      captureException(error)

      if (query.meta) {
        console.log(query.meta.errorMessage, error)
        return
      }

      console.log(error)
    },
  }),
})

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
