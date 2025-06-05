import type { PropsWithChildren } from 'react'

// Contexts
import { ReadPassageContextProvider } from './read-passage.context'
import { ReadSettingsContextProvider } from './read-settings.context'
import { ReadPassageChapterContextProvider } from './read-passage-chapter.context'

export default function ReadProviders({
  children,
}: PropsWithChildren<{
  router?: { queryChapter?: string; pathname?: string }
}>) {
  return (
    <ReadPassageContextProvider>
      <ReadPassageChapterContextProvider>
        <ReadSettingsContextProvider>{children}</ReadSettingsContextProvider>
      </ReadPassageChapterContextProvider>
    </ReadPassageContextProvider>
  )
}
