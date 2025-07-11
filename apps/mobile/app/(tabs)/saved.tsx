import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { Q } from '@nozbe/watermelondb'

// Components
import SavedFiltersButton from '@repo/app/features/saved/components/saved-filters-button.mobile'
import SavedList from '@repo/app/features/saved/components/saved-list.mobile'

// Contexts
import { useSavedFilters } from '@repo/app/features/saved/contexts/saved-filters.context'

// Database
import database from '@repo/app/database'
import SavedVerseModel from '@repo/app/database/models/saved-verse.model'

export default function SavedPage() {
  // Local state for saved page
  const [savedVerses, setSavedVerses] = useState<SavedVerseModel[]>([])
  const [isError, setIsError] = useState(false)

  // Filter integration
  const filterType = useSavedFilters((state) => state.type)
  const filterColor = useSavedFilters((state) => state.color)

  // Dynamic database subscription with filtering
  useEffect(() => {
    let savedVersesQuery = database.collections
      .get<SavedVerseModel>('saved_verses')
      .query(Q.sortBy('created_at', 'desc'))

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
        console.log(
          `Saved verses loaded successfully! Found ${verses.length} verses.`,
        )
      },
      error: (err) => {
        console.error('Error loading saved verses:', err)
        setIsError(true)
      },
    })

    return () => subscription.unsubscribe()
  }, [filterType, filterColor])

  return (
    <>
      <View className="border-b border-[#e6e6e6] px-6 pb-4 pt-2 min-[744px]:px-40 md:px-52 lg:px-96 dark:border-[#374151]">
        <SavedFiltersButton />
      </View>

      <SavedList
        savedVerses={savedVerses}
        isError={isError}
        hasFilters={Boolean(filterType || filterColor)}
      />
    </>
  )
}
