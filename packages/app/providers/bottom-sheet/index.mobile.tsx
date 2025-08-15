import { PropsWithChildren } from 'react'

// Sheet Providers
import { SettingSheetMobileProvider } from './setting-bottom-sheet.mobile'
import { SaverSheetMobileProvider } from './saver-bottom-sheet/saver-bottom-sheet.mobile'
import { SavedFiltersSheetMobileProvider } from './saved-filters-bottom-sheet/saved-filters-bottom-sheet.mobile'

export function SheetsMobileProvider({ children }: PropsWithChildren) {
  return (
    <SettingSheetMobileProvider>
      <SaverSheetMobileProvider>
        <SavedFiltersSheetMobileProvider>
          {children}
        </SavedFiltersSheetMobileProvider>
      </SaverSheetMobileProvider>
    </SettingSheetMobileProvider>
  )
}
