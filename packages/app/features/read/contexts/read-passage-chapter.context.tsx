import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react'
import { useStore } from 'zustand'

// Zustand Store
import {
  createReadPassageChapterStore,
  type ReadPassageChapterStore,
} from './read-passage-chapter.store'

type ReadPassageChapterContextType = ReturnType<
  typeof createReadPassageChapterStore
>

const ReadPassageChapterContext = createContext<
  ReadPassageChapterContextType | undefined
>(undefined)

export function ReadPassageChapterContextProvider({
  children,
}: PropsWithChildren) {
  const readPassageChapterStoreRef =
    useRef<ReadPassageChapterContextType | null>(null)
  if (readPassageChapterStoreRef.current === null) {
    readPassageChapterStoreRef.current = createReadPassageChapterStore()
  }

  return (
    <ReadPassageChapterContext.Provider
      value={readPassageChapterStoreRef.current}
    >
      {children}
    </ReadPassageChapterContext.Provider>
  )
}

export function useReadPassageChapterContext<T>(
  selector: (_store: ReadPassageChapterStore) => T,
) {
  const value = useContext(ReadPassageChapterContext)

  if (!value) {
    throw new Error(
      'useReadPassageChapterContext must be used within ReadPassageChapterContextProvider',
    )
  }

  return useStore(value, selector)
}
