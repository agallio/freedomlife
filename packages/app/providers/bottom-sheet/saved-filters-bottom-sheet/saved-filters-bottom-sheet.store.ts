import { createStore } from 'zustand/vanilla'

type SavedFiltersSheetState = {
  savedFiltersSheetOpen: boolean
}

export type SavedFiltersSheetStore = SavedFiltersSheetState

const defaultSavedFiltersSheetState: SavedFiltersSheetState = {
  savedFiltersSheetOpen: false,
}

export const createSavedFiltersSheetStore = (
  initialState = defaultSavedFiltersSheetState,
) => {
  return createStore<SavedFiltersSheetStore>()(() => ({
    // Initialize state
    ...initialState,
  }))
}
