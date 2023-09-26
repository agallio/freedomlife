// on Web, we don't use react-native-netinfo, so we avoid the provider altogether
// instead, we just have a no-op here
// for more, see: https://solito.dev/recipes/tree-shaking

import type { PropsWithChildren } from 'react'

export const NetworkConnectionProvider = ({
  children,
}: PropsWithChildren<{}>) => <>{children}</>
