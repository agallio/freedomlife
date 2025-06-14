import { PropsWithChildren } from 'react'

// Sheet Providers
import { SettingSheetMobileProvider } from './setting-bottom-sheet.mobile'
import { SaverSheetMobileProvider } from './saver-bottom-sheet/saver-bottom-sheet.mobile'

export function SheetsMobileProvider({ children }: PropsWithChildren) {
  return (
    <SettingSheetMobileProvider>
      <SaverSheetMobileProvider>{children}</SaverSheetMobileProvider>
    </SettingSheetMobileProvider>
  )
}
