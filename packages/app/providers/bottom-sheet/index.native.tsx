import type { PropsWithChildren } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// Bottom Sheet Providers
import { SettingSheetProvider } from './setting-bottom-sheet.native'

export default function BottomSheetNativeProvider({
  children,
}: PropsWithChildren) {
  return (
    <BottomSheetModalProvider>
      <SettingSheetProvider>{children}</SettingSheetProvider>
    </BottomSheetModalProvider>
  )
}
