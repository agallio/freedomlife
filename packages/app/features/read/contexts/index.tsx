import { type PropsWithChildren } from 'react'
import { type Router } from 'next/router'

// Contexts
import { ReadPassageContextProvider } from './read-passage.context'
import { ReadSettingsContextProvider } from './read-settings.context'
import { ReadPassageChapterContextProvider } from './read-passage-chapter.context'

export type ReadProvidersProps = PropsWithChildren<{ router?: Router }>

export default function ReadProviders({ children }: ReadProvidersProps) {
  return (
    <ReadPassageContextProvider>
      <ReadPassageChapterContextProvider>
        <ReadSettingsContextProvider>{children}</ReadSettingsContextProvider>
      </ReadPassageChapterContextProvider>
    </ReadPassageContextProvider>
  )
}
