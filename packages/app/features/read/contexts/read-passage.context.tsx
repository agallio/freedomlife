import {
  createContext,
  useContext,
  useRef,
  useMemo,
  type PropsWithChildren,
} from 'react'
import { useStore } from 'zustand'

import { Platform } from 'react-native'

// Zustand Store
import {
  createReadPassageStore,
  type ReadSelectedTextType,
  type ReadPassageStore,
} from './read-passage.store'

// Utils
import { passageData } from '../../../utils/constants'
import usePersistedState from '../../../utils/hooks/use-persisted-state'

type ReadPassagePersistedContextProps = PropsWithChildren<{
  router?: { queryChapter?: string; pathname?: string }
}>

type ReadPassageStoreApi = ReturnType<typeof createReadPassageStore>
type ReadPassagePersistedApi = {
  guidedEnabled: boolean
  selectedBiblePassage: string
  setGuidedEnabled: (_guideEnabled: boolean) => void
  setSelectedBiblePassage: (_selectedBiblePassage: string) => void
}

const ReadPassageGeneralContext = createContext<
  ReadPassageStoreApi | undefined
>(undefined)
const ReadPassagePersistedContext = createContext<
  ReadPassagePersistedApi | undefined
>(undefined)

export function ReadPassageContextProvider({
  children,
  router,
}: ReadPassagePersistedContextProps) {
  // Refs
  const readPassageStoreRef = useRef<ReadPassageStoreApi | null>(null)
  if (readPassageStoreRef.current === null) {
    readPassageStoreRef.current = createReadPassageStore()
  }

  return (
    <ReadPassageGeneralContext.Provider value={readPassageStoreRef.current}>
      <ReadPassagePersistedContextProvider router={router}>
        {children}
      </ReadPassagePersistedContextProvider>
    </ReadPassageGeneralContext.Provider>
  )
}

function ReadPassagePersistedContextProvider({
  children,
  router,
}: ReadPassagePersistedContextProps) {
  // Persisted State
  const [guidedEnabled, setGuidedEnabled] = usePersistedState(
    'withGuide',
    false,
  )
  const [storedSelectedBiblePassage, setStoredSelectedBiblePassage] =
    usePersistedState('selectedBiblePassage', 'kej-1')

  // Constants
  const chapterQueryParam = router?.queryChapter || 'kej-1'
  const isWebGuided = router?.pathname === '/read'
  const isGuidedEnabled = Platform.OS === 'web' ? isWebGuided : guidedEnabled

  // Memoized Values
  const selectedBiblePassage = useMemo(() => {
    if (Platform.OS === 'web') {
      const splittedChapterQueryParam = chapterQueryParam.split('-')
      const isChapterQueryParamFormatValid =
        splittedChapterQueryParam.length === 2

      if (isChapterQueryParamFormatValid) {
        const [abbr] = splittedChapterQueryParam
        const isAbbrValid =
          passageData.findIndex((passage) => passage.abbr === abbr) >= 0

        if (!isAbbrValid) {
          return 'invalid'
        }

        return chapterQueryParam
      }

      return 'invalid'
    }

    return storedSelectedBiblePassage
  }, [chapterQueryParam, storedSelectedBiblePassage])

  return (
    <ReadPassagePersistedContext.Provider
      value={{
        guidedEnabled: isGuidedEnabled,
        selectedBiblePassage,
        setGuidedEnabled,
        setSelectedBiblePassage: setStoredSelectedBiblePassage,
      }}
    >
      {children}
    </ReadPassagePersistedContext.Provider>
  )
}

export function useReadPassagePersistedContext() {
  const value = useContext(ReadPassagePersistedContext)

  if (!value) {
    throw new Error(
      'useReadPassagePersistedContext must be used within ReadPassageContextProvider',
    )
  }

  return value
}

export function useReadPassageGeneralContext<T>(
  selector: (_store: ReadPassageStore) => T,
) {
  const value = useContext(ReadPassageGeneralContext)

  if (!value) {
    throw new Error(
      'useReadPassageGeneralContext must be used within ReadPassageContextProvider',
    )
  }

  return useStore(value, selector)
}

// Utils
export function generateTextToCopy(
  selectedText: ReadSelectedTextType[],
  bibleVersion: string,
) {
  let mapSelectedContent
  let mapSelectedVerse

  const passageTitle = selectedText[0].passage
  const sortedSelectedText = selectedText.sort((a, b) => a.verse - b.verse)

  const selectedContent = sortedSelectedText.map((item) => item.content)
  const selectedVerse = sortedSelectedText.map((item) => item.verse)
  const checkDiffVerse = selectedVerse
    .slice(1)
    .map((n, i) => n - selectedVerse[i]!)
  const isIncreasingSequence = checkDiffVerse.every((value) => value === 1)

  if (selectedVerse.length > 1) {
    if (isIncreasingSequence) {
      mapSelectedVerse = `${selectedVerse[0]}-${
        selectedVerse[selectedVerse.length - 1]
      }`
      mapSelectedContent = selectedContent.join(' ')
    } else {
      mapSelectedVerse = selectedVerse.join(',')
      mapSelectedContent = selectedContent
        .map((item, index) => `${selectedVerse[index]}. ${item}`)
        .join('\n\n')
    }
  } else {
    mapSelectedVerse = selectedVerse[0]
    mapSelectedContent = selectedContent[0]
  }

  return `"${mapSelectedContent}" - ${passageTitle}:${mapSelectedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`
}
