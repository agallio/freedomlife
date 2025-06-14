import { createStore } from 'zustand/vanilla'

type SaverSheetState = {
  saverSheetOpen: boolean
}

export type SaverSheetStore = SaverSheetState

const defaultSaverSheetState: SaverSheetState = {
  saverSheetOpen: false,
}

export const createSaverSheetStore = (
  initialState = defaultSaverSheetState,
) => {
  return createStore<SaverSheetStore>()(() => ({
    // Initialize state
    ...initialState,
  }))
}
