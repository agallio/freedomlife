import { ReadPassageContext } from './ReadPassageContext'
import { ReadSettingsContext } from './ReadSettingsContext'

// Types
import type { PropsWithChildren } from 'react'

export function ReadContextProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ReadPassageContext>
      <ReadSettingsContext>{children}</ReadSettingsContext>
    </ReadPassageContext>
  )
}
