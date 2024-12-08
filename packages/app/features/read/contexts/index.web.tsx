// Contexts
import { ReadModalsContextProvider } from './read-modals.context'
import {
  ReadPassageContextProvider,
  type ReadProvidersProps,
} from './read-passage.context'
import { ReadSettingsContextProvider } from './read-settings.context'
import { ReadPassageChapterContextProvider } from './read-passage-chapter.context'

export default function ReadProviders({
  children,
  router,
}: ReadProvidersProps) {
  return (
    <ReadModalsContextProvider>
      <ReadPassageContextProvider router={router}>
        <ReadPassageChapterContextProvider>
          <ReadSettingsContextProvider>{children}</ReadSettingsContextProvider>
        </ReadPassageChapterContextProvider>
      </ReadPassageContextProvider>
    </ReadModalsContextProvider>
  )
}
