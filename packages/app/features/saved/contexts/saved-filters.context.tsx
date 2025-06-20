import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react'
import {
  createSavedFiltersStore,
  type SavedFiltersStore,
} from './saved-filters.store'
import { useStore } from 'zustand'

type SavedFiltersStoreApi = ReturnType<typeof createSavedFiltersStore>

const SavedFiltersStoreContext = createContext<
  SavedFiltersStoreApi | undefined
>(undefined)

export function SavedFiltersProvider({ children }: PropsWithChildren) {
  // Refs
  const savedFiltersStoreRef = useRef<SavedFiltersStoreApi | null>(null)
  if (savedFiltersStoreRef.current === null) {
    savedFiltersStoreRef.current = createSavedFiltersStore()
  }

  return (
    <SavedFiltersStoreContext.Provider value={savedFiltersStoreRef.current}>
      {children}
    </SavedFiltersStoreContext.Provider>
  )
}

export function useSavedFilters<T>(selector: (_store: SavedFiltersStore) => T) {
  const value = useContext(SavedFiltersStoreContext)

  if (!value) {
    throw new Error(
      'useSavedFilters must be used within SavedFiltersProvider',
    )
  }

  return useStore(value, selector)
}
