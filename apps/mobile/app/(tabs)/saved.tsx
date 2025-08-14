import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { Q } from '@nozbe/watermelondb'
import { captureException } from '@sentry/react-native'

// Components
import SavedFiltersButton from '@repo/app/features/saved/components/saved-filters-button.mobile'
import SavedList from '@repo/app/features/saved/components/saved-list.mobile'
import SearchInput from '@repo/app/components/search-input'

// Contexts
import { useSavedFilters } from '@repo/app/features/saved/contexts/saved-filters.context'

// Database
import database from '@repo/app/database'
import SavedVerseModel from '@repo/app/database/models/saved-verse.model'

export default function SavedPage() {
  const filterType = useSavedFilters((state) => state.type)
  const filterColor = useSavedFilters((state) => state.color)

  // States
  const [savedVerses, setSavedVerses] = useState<SavedVerseModel[]>([])
  const [isError, setIsError] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [totalCount, setTotalCount] = useState(0)

  // Effects
  // Track total count efficiently to determine if filters should be disabled
  useEffect(() => {
    const countSubscription = database.collections
      .get<SavedVerseModel>('saved_verses')
      .query()
      .observeCount()
      .subscribe({
        next: (count) => {
          setTotalCount(count)
        },
        error: (err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error counting saved verses:', err)
          }
          captureException(err, {
            tags: {
              page: 'SavedPage',
              operation: 'count',
            },
          })
        },
      })

    return () => countSubscription.unsubscribe()
  }, [])

  // Dynamic database subscription with filtering
  useEffect(() => {
    // If no data exists, don't apply filters and just show empty state
    if (totalCount === 0) {
      setSavedVerses([])
      return
    }

    let savedVersesQuery = database.collections
      .get<SavedVerseModel>('saved_verses')
      .query(Q.sortBy('created_at', 'desc'))

    // Add search filter if search text is provided (minimum 2 characters)
    if (searchText && searchText.length >= 2) {
      savedVersesQuery = savedVersesQuery.extend(
        Q.or(
          Q.where('book', Q.like(`%${searchText}%`)),
          Q.where('chapter', Q.like(`%${searchText}%`)),
          Q.where('version', Q.like(`%${searchText}%`)),
          Q.where('verse_text', Q.like(`%${searchText}%`)),
        ),
      )
    }

    // Add type filter if selected
    if (filterType) {
      savedVersesQuery = savedVersesQuery.extend(Q.where('kind', filterType))
    }

    // Add color filter only for highlights with non-empty color
    if (filterType === 'highlight' && filterColor) {
      savedVersesQuery = savedVersesQuery.extend(Q.where('color', filterColor))
    }

    const subscription = savedVersesQuery.observe().subscribe({
      next: (verses) => {
        setSavedVerses(verses)
      },
      error: (err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading saved verses:', err)
        }

        captureException(err, {
          tags: {
            page: 'SavedPage',
            operation: 'load',
          },
        })

        setIsError(true)
      },
    })

    return () => subscription.unsubscribe()
  }, [filterType, filterColor, totalCount, searchText])

  return (
    <>
      <View className="gap-3 border-b border-[#e6e6e6] px-6 pb-4 pt-2 min-[744px]:px-40 md:px-52 lg:px-96 dark:border-[#374151]">
        <SavedFiltersButton disabled={totalCount === 0} />

        <SearchInput
          withClearButton
          placeholderText="Cari Ayat ..."
          disabled={isError || totalCount === 0}
          initialSearchText={searchText}
          updateSearchText={setSearchText}
        />
      </View>

      <SavedList
        savedVerses={savedVerses}
        isError={isError}
        hasFilters={Boolean(
          filterType || filterColor || (searchText && searchText.length >= 2),
        )}
      />
    </>
  )
}
