import { createStore } from 'zustand/vanilla'
import SavedVerseModel from '../../../database/models/saved-verse.model'

type SavedVersesState = {
  // State - Context-Aware Loading
  currentContextVerses: SavedVerseModel[] // Only current Bible version + current passage for reading UI
}

type SavedVersesActions = {
  actions: {
    // Methods - Context Data Management
    setCurrentContextVerses: (_currentContextVerses: SavedVerseModel[]) => void

    // Methods - Bulk Reactive Updates (for better performance)
    updateStoreAfterBulkAdd: (_verses: SavedVerseModel[]) => void
    updateStoreAfterBulkUpdate: (_verses: SavedVerseModel[]) => void
    updateStoreAfterBulkDelete: (_verseIds: string[]) => void
  }
}

export type SavedVersesStore = SavedVersesState & SavedVersesActions

const defaultSavedVersesState: SavedVersesState = {
  currentContextVerses: [],
}

export const createSavedVersesStore = (
  initialState = defaultSavedVersesState,
) => {
  return createStore<SavedVersesStore>()((set, get) => ({
    // Initialize state with default or provided initial state
    ...initialState,

    actions: {
      /**
       * Sets current context verses for reading UI (current Bible version + passage)
       * Called when Bible version changes or when loading verses for current reading context
       */
      setCurrentContextVerses: (currentContextVerses) => {
        set((prevState) => ({ ...prevState, currentContextVerses }))
      },

      /**
       * Updates store after successful bulk add operation
       * Much more efficient than multiple individual adds
       */
      updateStoreAfterBulkAdd: (verses) => {
        set((prevState) => {
          const newCurrentContextVerses = [
            ...prevState.currentContextVerses,
            ...verses,
          ]

          return {
            ...prevState,
            currentContextVerses: newCurrentContextVerses,
          }
        })
      },

      /**
       * Updates store after successful bulk update operation
       * Much more efficient than multiple individual updates
       */
      updateStoreAfterBulkUpdate: (updatedVerses) => {
        set((prevState) => {
          const updateArray = (verses: SavedVerseModel[]) => {
            const updatedIds = new Set(updatedVerses.map((v) => v.id))
            const updatedMap = new Map(updatedVerses.map((v) => [v.id, v]))

            return verses.map((verse) =>
              updatedIds.has(verse.id) ? updatedMap.get(verse.id)! : verse,
            )
          }

          return {
            ...prevState,
            currentContextVerses: updateArray(prevState.currentContextVerses),
          }
        })
      },

      /**
       * Updates store after successful bulk delete operation
       * Much more efficient than multiple individual deletes
       */
      updateStoreAfterBulkDelete: (verseIds) => {
        set((prevState) => {
          const idsToDelete = new Set(verseIds)
          const filterArray = (verses: SavedVerseModel[]) =>
            verses.filter((verse) => !idsToDelete.has(verse.id))

          return {
            ...prevState,
            currentContextVerses: filterArray(prevState.currentContextVerses),
          }
        })
      },
    },
  }))
}

export type SavedVersesStoreApi = ReturnType<typeof createSavedVersesStore>
