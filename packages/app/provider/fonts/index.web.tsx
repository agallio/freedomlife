// on Web, we don't use expo-font on web, so we avoid the provider altogether
// instead, we just have a no-op here
// for more, see: https://solito.dev/recipes/tree-shaking

import type { PropsWithChildren } from 'react'

export function FontsProvider({ children }: PropsWithChildren<{}>) {
  return <>{children}</>
}
