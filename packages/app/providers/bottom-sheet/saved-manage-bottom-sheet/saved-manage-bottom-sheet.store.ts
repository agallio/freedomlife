import { createStore } from 'zustand/vanilla'

type SavedManageSheetState = {
  savedManageSheetOpen: boolean
}

export type SavedManageSheetStore = SavedManageSheetState

const defaultSavedManageSheetState: SavedManageSheetState = {
  savedManageSheetOpen: false,
}

export const createSavedManageSheetStore = (
  initialState = defaultSavedManageSheetState,
) => {
  return createStore<SavedManageSheetStore>()(() => ({
    // Initialize state
    ...initialState,
  }))
}
