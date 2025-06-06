import { createStore } from 'zustand/vanilla'

type ReadPassageChapterState = {
  searchText: string
  dialogSelectedPassage: string
}

type ReadPassageChapterActions = {
  actions: {
    setSearchText: (_searchText: string) => void
    setDialogSelectedPassage: (_dialogSelectedPassage: string) => void
  }
}

export type ReadPassageChapterStore = ReadPassageChapterState &
  ReadPassageChapterActions

const defaultReadPassageChapterState: ReadPassageChapterState = {
  searchText: '',
  dialogSelectedPassage: '',
}

export const createReadPassageChapterStore = (
  initialState = defaultReadPassageChapterState,
) => {
  return createStore<ReadPassageChapterStore>()((set) => ({
    // Initialize state
    ...initialState,

    // Actions
    actions: {
      setSearchText: (searchText) => set({ searchText }),
      setDialogSelectedPassage: (dialogSelectedPassage) =>
        set({ dialogSelectedPassage }),
    },
  }))
}
