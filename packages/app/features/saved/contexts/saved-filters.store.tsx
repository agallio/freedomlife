import { createStore } from 'zustand'

type SavedFiltersState = {
  type: 'bookmark' | 'highlight' | ''
  color: string
}

type SavedFiltersActions = {
  actions: {
    setSavedFilter: (_filter: SavedFiltersState) => void
  }
}

export type SavedFiltersStore = SavedFiltersState & SavedFiltersActions

const defaultSavedFiltersState: SavedFiltersState = {
  type: '',
  color: '',
}

export const createSavedFiltersStore = (
  initialState = defaultSavedFiltersState,
) => {
  return createStore<SavedFiltersStore>()((set) => ({
    // Initialize state
    ...initialState,

    // Actions
    actions: {
      setSavedFilter: (filter) =>
        set((prevState) => ({ ...prevState, ...filter })),
    },
  }))
}
