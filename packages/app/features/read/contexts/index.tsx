// Contexts
import {
  ReadPassageContextProvider,
  type ReadProvidersProps,
} from './read-passage.context'
import { ReadSettingsContextProvider } from './read-settings.context'
import { ReadPassageChapterContextProvider } from './read-passage-chapter.context'

export default function ReadProviders({ children }: ReadProvidersProps) {
  return (
    <ReadPassageContextProvider>
      <ReadPassageChapterContextProvider>
        <ReadSettingsContextProvider>{children}</ReadSettingsContextProvider>
      </ReadPassageChapterContextProvider>
    </ReadPassageContextProvider>
  )
}
