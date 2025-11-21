import { createContext, useContext } from 'react'

// Types
import type { FeatureFlagClientData } from '../types'

const FeatureFlagsContext = createContext<FeatureFlagClientData>({})

export function FeatureFlagsProvider({
  children,
  featureFlags,
}: {
  children: React.ReactNode
  featureFlags: FeatureFlagClientData
}) {
  return (
    <FeatureFlagsContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function useFeatureFlagContext(featureFlag: string) {
  const context = useContext(FeatureFlagsContext)

  const data = context[featureFlag]

  if (!data) {
    return { data: { enabled: false }, isLoading: false }
  }

  return data
}
