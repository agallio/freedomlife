import { createStore } from 'zustand/vanilla'

// Utils
import dayjs from '../../../utils/dayjs'
import { isSunsetActive } from '../../../utils/constants'

export type ReadSelectedTextType = {
  passage: string
  verse: number
  content: string
}

type ReadPassageContextGuidedStateType = {
  date: string
  selectedOrder: string
}

type ReadPassageState = {
  // State - Guided
  guided: ReadPassageContextGuidedStateType

  // State - General
  selectedText: ReadSelectedTextType[]
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
    insertSelectedText: (_selectedText: ReadSelectedTextType) => void
    updateSelectedText: (_selectedText: ReadSelectedTextType[]) => void
    resetSelectedText: () => void
  }
}

export type ReadPassageStore = ReadPassageState & ReadPassageActions

const getDefaultBibleVersion = (): string => {
  if (isSunsetActive()) {
    return 'tb'
  }
  return 'tb'
}

const defaultReadPassageState: ReadPassageState = {
  // State - Guided
  guided: {
    date: '',
    selectedOrder: 'pl-1',
  },

  // State - General
  selectedText: [],
  guidesHaveBeenRead: [],
  selectedGuideMonth: dayjs().format('MM'),
  selectedBibleVersion: getDefaultBibleVersion(),
}

export const createReadPassageStore = (
  initialState = defaultReadPassageState,
) => {
  if (isSunsetActive() && initialState.selectedBibleVersion !== 'tb') {
    initialState.selectedBibleVersion = 'tb'
  }

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
      setGuidedSelectedPassage: (guidedOrder) =>
        set((prevState) => ({
          ...prevState,
          guided: { ...prevState.guided, selectedOrder: guidedOrder },
        })),

      // Actions - General
      setGuidesHaveBeenRead: (guidesHaveBeenRead) =>
        set((prevState) => ({ ...prevState, guidesHaveBeenRead })),
      setSelectedGuideMonth: (selectedGuideMonth) =>
        set((prevState) => ({ ...prevState, selectedGuideMonth })),
      setSelectedBibleVersion: (selectedBibleVersion) => {
        if (isSunsetActive() && selectedBibleVersion !== 'tb') {
          return
        }

        set((prevState) => ({ ...prevState, selectedBibleVersion }))
      },
      insertSelectedText: (selectedText) =>
        set((prevState) => ({
          ...prevState,
          selectedText: [...prevState.selectedText, selectedText],
        })),
      updateSelectedText: (selectedText) =>
        set((prevState) => ({ ...prevState, selectedText })),
      resetSelectedText: () =>
        set((prevState) => ({ ...prevState, selectedText: [] })),
    },
  }))
}
