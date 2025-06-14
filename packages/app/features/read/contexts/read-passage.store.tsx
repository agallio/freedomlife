import { createStore } from 'zustand/vanilla'
import dayjs from '../../../utils/dayjs'

export type ReadHighlightedTextType = {
  passage: string
  verse: number
  content: string
}

type ReadPassageContextGuidedStateType = {
  date: string
  selectedPassage: string
}

type ReadPassageState = {
  // State - Guided
  guided: ReadPassageContextGuidedStateType

  // State - General
  highlightedText: ReadHighlightedTextType[]
  guidesHaveBeenRead: string[]
  selectedGuideMonth: string
  selectedBibleVersion: string
}

type ReadPassageActions = {
  actions: {
    // Methods - Guided
    setGuidedDate: (_guidedDate: string) => void
    setGuidedSelectedPassage: (_guidedPassage: string) => void

    // Methods - General
    setGuidesHaveBeenRead: (_guidesHaveBeenRead: string[]) => void
    setSelectedGuideMonth: (_guideMonth: string) => void
    setSelectedBibleVersion: (_bibleVersion: string) => void
    insertHighlightedText: (_highlightedText: ReadHighlightedTextType) => void
    updateHighlightedText: (_highlightedText: ReadHighlightedTextType[]) => void
    resetHighlightedText: () => void
  }
}

export type ReadPassageStore = ReadPassageState & ReadPassageActions

const defaultReadPassageState: ReadPassageState = {
  // State - Guided
  guided: {
    date: '',
    selectedPassage: 'pl-1',
  },

  // State - General
  highlightedText: [],
  guidesHaveBeenRead: [],
  selectedGuideMonth: dayjs().format('MM'),
  selectedBibleVersion: 'tb',
}

export const createReadPassageStore = (
  initialState = defaultReadPassageState,
) => {
  return createStore<ReadPassageStore>()((set) => ({
    // Initialize state
    ...initialState,

    // Actions - Guided
    actions: {
      setGuidedDate: (guidedDate) =>
        set((prevState) => ({
          ...prevState,
          guided: { ...prevState.guided, date: guidedDate },
        })),
      setGuidedSelectedPassage: (guidedPassage) =>
        set((prevState) => ({
          ...prevState,
          guided: { ...prevState.guided, selectedPassage: guidedPassage },
        })),

      // Actions - General
      setGuidesHaveBeenRead: (guidesHaveBeenRead) =>
        set((prevState) => ({ ...prevState, guidesHaveBeenRead })),
      setSelectedGuideMonth: (selectedGuideMonth) =>
        set((prevState) => ({ ...prevState, selectedGuideMonth })),
      setSelectedBibleVersion: (selectedBibleVersion) =>
        set((prevState) => ({ ...prevState, selectedBibleVersion })),
      insertHighlightedText: (highlightedText) =>
        set((prevState) => ({
          ...prevState,
          highlightedText: [...prevState.highlightedText, highlightedText],
        })),
      updateHighlightedText: (highlightedText) =>
        set((prevState) => ({ ...prevState, highlightedText })),
      resetHighlightedText: () =>
        set((prevState) => ({ ...prevState, highlightedText: [] })),
    },
  }))
}
