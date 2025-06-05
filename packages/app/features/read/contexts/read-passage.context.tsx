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
  type ReadHighlightedTextType,
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
  highlightedText: ReadHighlightedTextType[],
  bibleVersion: string,
  passageTitle: string,
) {
  let mapHighlightedContent
  let mapHighlightedVerse

  const sortedHighlightedText = highlightedText.sort(
    (a, b) => a.verse - b.verse,
  )

  const highlightedContent = sortedHighlightedText.map((item) => item.content)
  const highlightedVerse = sortedHighlightedText.map((item) => item.verse)
  const checkDiffVerse = highlightedVerse
    .slice(1)
    .map((n, i) => n - highlightedVerse[i]!)
  const isIncreasingSequence = checkDiffVerse.every((value) => value === 1)

  if (highlightedVerse.length > 1) {
    if (isIncreasingSequence) {
      mapHighlightedVerse = `${highlightedVerse[0]}-${
        highlightedVerse[highlightedVerse.length - 1]
      }`
      mapHighlightedContent = highlightedContent.join(' ')
    } else {
      mapHighlightedVerse = highlightedVerse.join(',')
      mapHighlightedContent = highlightedContent
        .map((item, index) => `${highlightedVerse[index]}. ${item}`)
        .join('\n\n')
    }
  } else {
    mapHighlightedVerse = highlightedVerse[0]
    mapHighlightedContent = highlightedContent[0]
  }

  return `"${mapHighlightedContent}" - ${passageTitle}:${mapHighlightedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`
}
