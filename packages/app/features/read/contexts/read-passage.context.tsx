import {
  createContext,
  useState,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react'
import { Platform } from 'react-native'

// Utils
import { passageData } from '../../../utils/constants'
import dayjs from '../../../utils/dayjs'
import usePersistedState from '../../../utils/hooks/use-persisted-state'

// Types
import type { ReadProvidersProps } from '.'

export type ReadHighlightedTextType = { verse: number; content: string }

type ReadPassageContextGuidedStateType = {
  enabled: boolean
  date: string
  selectedPassage: string
}

type ReadPassageContextType = {
  // State - Guided
  guided: ReadPassageContextGuidedStateType

  // State - General
  highlightedText: ReadHighlightedTextType[]
  guidesHaveBeenRead: string[]
  selectedGuideMonth: string
  selectedBibleVersion: string
  selectedBiblePassage: string

  // Methods - Guided
  setGuidedEnable: (_guidedEnabled: boolean) => void
  setGuidedDate: (_guidedDate: string) => void
  setGuidedSelectedPassage: (_guidedPassage: string) => void

  // Methods - General
  setGuidesHaveBeenRead: (_guidesHaveBeenRead: string[]) => void
  setSelectedGuideMonth: (_guideMonth: string) => void
  setSelectedBibleVersion: (_bibleVersion: string) => void
  setSelectedBiblePassage: (_biblePassage: string) => void
  insertHighlightedText: (_highlightedText: ReadHighlightedTextType) => void
  updateHighlightedText: (_highlightedText: ReadHighlightedTextType[]) => void
}

const ReadPassageContext = createContext<ReadPassageContextType>({
  // State - Guided
  guided: {
    enabled: false,
    date: '',
    selectedPassage: '',
  },

  // State - General
  highlightedText: [],
  guidesHaveBeenRead: [],
  selectedGuideMonth: '',
  selectedBibleVersion: 'tb',
  selectedBiblePassage: '',

  // Methods - Guided
  setGuidedEnable: () => {},
  setGuidedDate: () => {},
  setGuidedSelectedPassage: () => {},

  // Methods - General
  setGuidesHaveBeenRead: () => {},
  setSelectedGuideMonth: () => {},
  setSelectedBibleVersion: () => {},
  setSelectedBiblePassage: () => {},
  insertHighlightedText: () => {},
  updateHighlightedText: () => {},
})

export function ReadPassageContextProvider({
  children,
  router,
}: PropsWithChildren<{ router?: ReadProvidersProps['router'] }>) {
  // States
  const [guidedState, setGuidedState] = useState({
    date: '',
    selectedPassage: 'pl-1',
  })
  const [generalState, setGeneralState] = useState({
    highlightedText: [] as ReadHighlightedTextType[],
    guidesHaveBeenRead: [] as string[],
    selectedGuideMonth: dayjs().format('MM'),
    selectedBibleVersion: 'tb',
    selectedBiblePassageInvalid: false,
  })

  // Persisted State
  const [guidedEnable, setGuidedEnable] = usePersistedState('withGuide', false)
  const [storedSelectedBiblePassage, setStoredSelectedBiblePassage] =
    usePersistedState('selectedBiblePassage', 'kej-1')

  // Constants
  const chapterQueryParam = (router?.query.chapter as string) || 'kej-1'
  const isWebGuided = router?.pathname === '/read'
  const isGuidedEnable = Platform.OS === 'web' ? isWebGuided : guidedEnable

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

  // Methods - Guided
  const setGuidedDate = (date: string) =>
    setGuidedState((prevState) => ({ ...prevState, date }))
  const setGuidedSelectedPassage = (selectedPassage: string) =>
    setGuidedState((prevState) => ({ ...prevState, selectedPassage }))

  // Methods - General
  const setGuidesHaveBeenRead = (guidesHaveBeenRead: string[]) =>
    setGeneralState((prevState) => ({ ...prevState, guidesHaveBeenRead }))

  const setSelectedGuideMonth = (selectedGuideMonth: string) =>
    setGeneralState((prevState) => ({ ...prevState, selectedGuideMonth }))

  const setSelectedBibleVersion = (selectedBibleVersion: string) =>
    setGeneralState((prevState) => ({ ...prevState, selectedBibleVersion }))

  const insertHighlightedText = (highlightedText: ReadHighlightedTextType) => {
    setGeneralState((prevState) => ({
      ...prevState,
      highlightedText: [...prevState.highlightedText, highlightedText],
    }))
  }
  const updateHighlightedText = (
    highlightedText: ReadHighlightedTextType[],
  ) => {
    setGeneralState((prevState) => ({ ...prevState, highlightedText }))
  }

  return (
    <ReadPassageContext.Provider
      value={{
        // State - Guided
        guided: {
          enabled: isGuidedEnable,
          date: guidedState.date,
          selectedPassage: guidedState.selectedPassage,
        },

        // State - General
        highlightedText: generalState.highlightedText,
        guidesHaveBeenRead: generalState.guidesHaveBeenRead,
        selectedGuideMonth: generalState.selectedGuideMonth,
        selectedBibleVersion: generalState.selectedBibleVersion,
        selectedBiblePassage,

        // Methods - Guided
        setGuidedEnable,
        setGuidedDate,
        setGuidedSelectedPassage,

        // Methods - General
        setGuidesHaveBeenRead,
        setSelectedGuideMonth,
        setSelectedBibleVersion,
        setSelectedBiblePassage: setStoredSelectedBiblePassage,
        insertHighlightedText,
        updateHighlightedText,
      }}
    >
      {children}
    </ReadPassageContext.Provider>
  )
}

export function useReadPassageContext() {
  const value = useContext(ReadPassageContext)

  if (!value) {
    throw new Error(
      'useReadPassageContext must be used within ReadPassageContextProvider',
    )
  }

  return value
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
