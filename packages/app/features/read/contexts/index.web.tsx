import type { PropsWithChildren } from 'react'

// Contexts
import { ReadModalsWebContextProvider } from './read-modals.context.web'
import { ReadPassageContextProvider } from './read-passage.context'
import { ReadSettingsContextProvider } from './read-settings.context'
import { ReadPassageChapterContextProvider } from './read-passage-chapter.context'

export default function ReadProviders({
  children,
  router,
}: PropsWithChildren<{
  router?: { queryChapter?: string; pathname?: string }
}>) {
  return (
    <ReadModalsWebContextProvider>
      <ReadPassageContextProvider router={router}>
        <ReadPassageChapterContextProvider>
          <ReadSettingsContextProvider>{children}</ReadSettingsContextProvider>
        </ReadPassageChapterContextProvider>
      </ReadPassageContextProvider>
    </ReadModalsWebContextProvider>
  )
}
