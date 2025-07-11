import { PropsWithChildren, createContext, useContext, useRef } from 'react'
import { Q } from '@nozbe/watermelondb'
import { useStore } from 'zustand'
import * as Expo from 'expo'

// Database
import database from '../../../database'
import SavedVerseModel from '../../../database/models/saved-verse.model'

// Store
import {
  createSavedVersesStore,
  type SavedVersesStoreApi,
  type SavedVersesStore,
} from './saved-verses.store'

type SavedVersesContextType = {
  // Methods - Data Loading
  loadCurrentContextVerses: (_data: {
    book: string
    chapter: string
    selectedBibleVersion: string
  }) => Promise<void>

  // Methods - CRUD Operations (with reactive updates)
  toggleVerseHighlight: (_data: {
    verses: Array<{ verseNumber: string; verseText: string }>
    chapter: string
    book: string
    abbr: string
    color: string
    selectedBibleVersion: string
  }) => Promise<boolean>
  toggleVerseBookmark: (_data: {
    verses: Array<{ verseNumber: string; verseText: string }>
    chapter: string
    book: string
    abbr: string
    selectedBibleVersion: string
  }) => Promise<boolean>
  resetDatabase: () => Promise<void>
}

const SavedVersesContext = createContext<SavedVersesStoreApi | undefined>(
  undefined,
)
const SavedVersesActionContext = createContext<SavedVersesContextType>({
  loadCurrentContextVerses: async () => {},
  toggleVerseHighlight: async () => false,
  toggleVerseBookmark: async () => false,
  resetDatabase: async () => {},
})

export function SavedVersesProvider({
  captureException,
  children,
}: PropsWithChildren<{
  captureException?: (_exception: unknown, _context?: any) => void
}>) {
  // Store
  const storeRef = useRef<SavedVersesStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createSavedVersesStore()
  }

  // Store actions and state
  const {
    setCurrentContextVerses,
    updateStoreAfterBulkAdd,
    updateStoreAfterBulkUpdate,
    updateStoreAfterBulkDelete,
  } = useStore(storeRef.current, (state) => state.actions)

  const currentContextVerses = useStore(
    storeRef.current,
    (state) => state.currentContextVerses,
  )

  // Methods - Data Loading

  /**
   * Loads saved verses for current reading context (current Bible version only)
   * Called when Bible version changes or when reading screen loads
   */
  const loadCurrentContextVerses = async ({
    book,
    chapter,
    selectedBibleVersion,
  }: {
    book: string
    chapter: string
    selectedBibleVersion: string
  }) => {
    try {
      const contextVerses = await database.collections
        .get<SavedVerseModel>('saved_verses')
        .query(
          Q.where('version', selectedBibleVersion),
          Q.where('book', book),
          Q.where('chapter', chapter),
          Q.sortBy('created_at', 'desc'),
        )
        .fetch()

      setCurrentContextVerses(contextVerses)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading current context verses:', error)
      }

      captureException?.(error, {
        tags: {
          method: 'loadCurrentContextVerses',
        },
      })
    }
  }

  // Methods - CRUD Operations (with reactive updates)
  const upsertSavedVerses = async ({
    book,
    abbr,
    chapter,
    verses,
    version,
    kind,
    color,
  }: {
    book: string
    abbr: string
    chapter: string
    verses: Array<{ verseNumber: string; verseText: string }>
    version: string
    kind: 'highlight' | 'bookmark'
    color: string | null
  }) => {
    try {
      const versesToProcess = verses.map((verse) => ({
        book,
        abbr,
        chapter,
        verse: verse.verseNumber,
        verseText: verse.verseText,
        version,
        kind,
        color,
      }))

      const createdVerses: SavedVerseModel[] = []
      const updatedVerses: SavedVerseModel[] = []

      await database.write(async () => {
        // Get all existing verses for this context in one query
        const verseNumbers = versesToProcess.map((v) => v.verse)
        const existingVerses = await database.collections
          .get<SavedVerseModel>('saved_verses')
          .query(
            Q.where('book', versesToProcess[0].book),
            Q.where('chapter', versesToProcess[0].chapter),
            Q.where('version', versesToProcess[0].version),
            Q.where('verse', Q.oneOf(verseNumbers)),
          )
          .fetch()

        const batchOperations = []

        for (const verseData of versesToProcess) {
          const existingVerse = existingVerses.find(
            (v) => v.verse === verseData.verse,
          )

          if (existingVerse) {
            // Update existing verse
            const updatedVerse = existingVerse.prepareUpdate((savedVerse) => {
              savedVerse.kind = verseData.kind
              savedVerse.color = verseData.color
            })
            batchOperations.push(updatedVerse)
            updatedVerses.push(existingVerse)
          } else {
            // Create new verse
            const newVerse = database
              .get<SavedVerseModel>('saved_verses')
              .prepareCreate((savedVerse) => {
                savedVerse.userId = ''
                savedVerse.book = verseData.book
                savedVerse.abbr = verseData.abbr
                savedVerse.chapter = verseData.chapter
                savedVerse.verse = verseData.verse
                savedVerse.verseText = verseData.verseText
                savedVerse.version = verseData.version
                savedVerse.kind = verseData.kind
                savedVerse.color = verseData.color
              })
            batchOperations.push(newVerse)
            createdVerses.push(newVerse)
          }
        }

        // Execute all operations in a single batch
        if (batchOperations.length > 0) {
          await database.batch(...batchOperations)
        }
      })

      // Reactive update: Update store after successful DB operation
      if (createdVerses.length > 0) {
        updateStoreAfterBulkAdd(createdVerses)
      }
      if (updatedVerses.length > 0) {
        updateStoreAfterBulkUpdate(updatedVerses)
      }

      return true
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error adding saved verse(s):', error)
      }

      captureException?.(error, {
        tags: {
          method: 'upsertSavedVerses',
        },
      })

      return false
    }
  }

  const deleteSavedVerses = async (ids: string | string[]) => {
    try {
      const idsToDelete = Array.isArray(ids) ? ids : [ids]

      await database.write(async () => {
        const versesToDelete = await database.collections
          .get<SavedVerseModel>('saved_verses')
          .query(Q.where('id', Q.oneOf(idsToDelete)))
          .fetch()

        const deleteOperations = versesToDelete.map((verse) =>
          verse.prepareDestroyPermanently(),
        )

        if (deleteOperations.length > 0) {
          await database.batch(...deleteOperations)
        }
      })

      updateStoreAfterBulkDelete(idsToDelete)

      return true
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error deleting saved verse(s):', error)
      }

      captureException?.(error, {
        tags: {
          method: 'deleteSavedVerses',
        },
      })

      return false
    }
  }

  const toggleVerseHighlight = async ({
    verses,
    chapter,
    book,
    abbr,
    color,
    selectedBibleVersion,
  }: {
    verses: Array<{ verseNumber: string; verseText: string }>
    chapter: string
    book: string
    abbr: string
    color: string
    selectedBibleVersion: string
  }) => {
    try {
      const verseNumbers = verses.map((v) => v.verseNumber)
      const existingHighlights = currentContextVerses.filter(
        (savedVerse) =>
          verseNumbers.includes(savedVerse.verse) &&
          savedVerse.chapter === chapter &&
          savedVerse.book === book &&
          savedVerse.kind === 'highlight',
      )

      // Check if all existing highlights have the same color (for removal logic)
      const allSameColor = existingHighlights.every(
        (highlight) => highlight.color === color,
      )
      const allVersesHaveHighlight =
        existingHighlights.length === verseNumbers.length

      if (allSameColor && allVersesHaveHighlight) {
        // Remove all existing highlights (toggle off)
        const verseIds = existingHighlights.map((highlight) => highlight.id)
        return await deleteSavedVerses(verseIds)
      } else {
        // Add/update highlights with new color (upsert)
        return await upsertSavedVerses({
          book,
          abbr,
          chapter,
          verses,
          version: selectedBibleVersion,
          kind: 'highlight',
          color,
        })
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error in bulk toggleVerseHighlight:', error)
      }

      captureException?.(error, {
        tags: {
          method: 'toggleVerseHighlight',
        },
      })

      return false
    }
  }

  const toggleVerseBookmark = async ({
    verses,
    chapter,
    book,
    abbr,
    selectedBibleVersion,
  }: {
    verses: Array<{ verseNumber: string; verseText: string }>
    chapter: string
    book: string
    abbr: string
    selectedBibleVersion: string
  }) => {
    try {
      const verseNumbers = verses.map((v) => v.verseNumber)
      const existingBookmarks = currentContextVerses.filter(
        (savedVerse) =>
          verseNumbers.includes(savedVerse.verse) &&
          savedVerse.chapter === chapter &&
          savedVerse.book === book &&
          savedVerse.kind === 'bookmark',
      )

      // Check if all verses have bookmarks (for removal logic)
      const allVersesHaveBookmark =
        existingBookmarks.length === verseNumbers.length

      if (allVersesHaveBookmark) {
        // Remove all existing bookmarks (toggle off)
        const bookmarkIds = existingBookmarks.map((bookmark) => bookmark.id)
        return await deleteSavedVerses(bookmarkIds)
      } else {
        // Add bookmarks to all verses (upsert - replace highlights or create new)
        return await upsertSavedVerses({
          book,
          abbr,
          chapter,
          verses,
          version: selectedBibleVersion,
          kind: 'bookmark',
          color: null,
        })
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error in bulk toggleVerseBookmark:', error)
      }

      captureException?.(error, {
        tags: {
          method: 'toggleVerseBookmark',
        },
      })

      return false
    }
  }

  const resetDatabase = async () => {
    await database.write(async () => {
      await database.unsafeResetDatabase()
      await Expo.reloadAppAsync()
    })
  }

  return (
    <SavedVersesContext.Provider value={storeRef.current}>
      <SavedVersesActionContext.Provider
        value={{
          loadCurrentContextVerses,
          toggleVerseHighlight,
          toggleVerseBookmark,
          resetDatabase,
        }}
      >
        {children}
      </SavedVersesActionContext.Provider>
    </SavedVersesContext.Provider>
  )
}

export function useSavedVersesActionContext() {
  const value = useContext(SavedVersesActionContext)

  if (!value) {
    console.error(
      'useSavedVersesActionContext must be used within SavedVersesProvider',
    )
  }

  return value
}

export function useSavedVersesContext<T>(
  selector: (_state: SavedVersesStore) => T,
): T {
  const store = useContext(SavedVersesContext)

  if (!store) {
    throw new Error(
      'useSavedVersesContext must be used within SavedVersesProvider',
    )
  }

  return useStore(store, selector)
}
