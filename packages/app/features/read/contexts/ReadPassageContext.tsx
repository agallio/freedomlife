import { createContext, PropsWithChildren, useContext, useState } from 'react'

// Utils
import dayjs from 'app/utils/dayjs'
import usePersistState from 'app/utils/hooks/usePersistState'

// Types
import type { GuideDataResponse, HighlightedText } from 'app/types'

interface ContextState {
  bibleVersion: string
  inGuide: boolean
  guidePassage: string
  guideDate: string
  guideMonth: string
  guideTodayData: GuideDataResponse | null
  guideData: GuideDataResponse | null
  guideHasBeenRead: string[]
  highlightedText: HighlightedText[]
}

interface ContextValue extends ContextState {
  passage: string
  setBibleVersion: (_: string) => void
  setInGuide: (_: boolean) => void
  setPassage: (_: string) => void
  setGuidePassage: (_: string) => void
  setGuideDate: (_: string) => void
  setGuideMonth: (_: string) => void
  setGuideTodayData: (_: GuideDataResponse) => void
  setGuideData: (_: GuideDataResponse) => void
  setGuideHasBeenRead: (_: string[]) => void
  setHighlightedText: (_: HighlightedText[]) => void
}

const InitialState: ContextState = {
  bibleVersion: 'tb',
  inGuide: false,
  guidePassage: '',
  guideDate: '',
  guideMonth: dayjs().format('MM'),
  guideTodayData: null,
  guideData: null,
  guideHasBeenRead: [],
  highlightedText: [],
}

const Context = createContext<ContextValue>({
  ...InitialState,
  passage: '',
  setBibleVersion: () => null,
  setInGuide: () => null,
  setPassage: () => null,
  setGuidePassage: () => null,
  setGuideDate: () => null,
  setGuideMonth: () => null,
  setGuideTodayData: () => null,
  setGuideData: () => null,
  setGuideHasBeenRead: () => null,
  setHighlightedText: () => null,
})

export function ReadPassageContext({ children }: PropsWithChildren<{}>) {
  const [
    {
      bibleVersion,
      inGuide,
      guidePassage,
      guideDate,
      guideMonth,
      guideTodayData,
      guideData,
      guideHasBeenRead,
      highlightedText,
    },
    setState,
  ] = useState<ContextState>(InitialState)
  const [passage, setPassage] = usePersistState<string>('passage', 'kej-1')

  const setBibleVersion = (bibleVersion: string) =>
    setState((prevState) => ({ ...prevState, bibleVersion }))
  const setInGuide = (inGuide: boolean) =>
    setState((prevState) => ({ ...prevState, inGuide }))
  const setGuidePassage = (guidePassage: string) =>
    setState((prevState) => ({ ...prevState, guidePassage }))
  const setGuideDate = (guideDate: string) =>
    setState((prevState) => ({ ...prevState, guideDate }))
  const setGuideMonth = (guideMonth: string) =>
    setState((prevState) => ({ ...prevState, guideMonth }))
  const setGuideTodayData = (guideTodayData: GuideDataResponse) =>
    setState((prevState) => ({ ...prevState, guideTodayData }))
  const setGuideData = (guideData: GuideDataResponse) =>
    setState((prevState) => ({ ...prevState, guideData }))
  const setGuideHasBeenRead = (guideHasBeenRead: string[]) =>
    setState((prevState) => ({ ...prevState, guideHasBeenRead }))
  const setHighlightedText = (highlightedText: HighlightedText[]) =>
    setState((prevState) => ({ ...prevState, highlightedText }))

  return (
    <Context.Provider
      value={{
        bibleVersion,
        inGuide,
        passage,
        guidePassage,
        guideDate,
        guideMonth,
        guideTodayData,
        guideData,
        guideHasBeenRead,
        highlightedText,
        setBibleVersion,
        setInGuide,
        setPassage,
        setGuidePassage,
        setGuideDate,
        setGuideMonth,
        setGuideTodayData,
        setGuideData,
        setGuideHasBeenRead,
        setHighlightedText,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useReadPassageContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error(
      'useReadPassageContext must be used within a ReadPassageContext'
    )
  }
  return context
}
