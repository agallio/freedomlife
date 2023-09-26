import { useFonts } from 'expo-font'

import { fontName } from '../dripsy'

import type { PropsWithChildren } from 'react'

export function FontsProvider({ children }: PropsWithChildren<{}>) {
  const [loaded] = useFonts({
    [fontName]: require('app/fonts/inter-regular.ttf'),
    [`${fontName}-bold`]: require('app/fonts/inter-bold.ttf'),
    [`${fontName}-light`]: require('app/fonts/inter-light.ttf'),
    [`${fontName}-medium`]: require('app/fonts/inter-medium.ttf'),
    [`${fontName}-semibold`]: require('app/fonts/inter-semibold.ttf'),
  })

  if (!loaded) return null

  return <>{children}</>
}
