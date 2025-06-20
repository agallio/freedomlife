import { View } from 'react-native'

// Components
import SavedFiltersButton from '@repo/app/features/saved/components/saved-filters-button.mobile'
import SavedList from '@repo/app/features/saved/components/saved-list.mobile'

export default function SavedPage() {
  return (
    <>
      <View className="border-b border-[#e6e6e6] px-6 pb-4 pt-2 min-[744px]:px-40 md:px-52 lg:px-96 dark:border-[#374151]">
        <SavedFiltersButton />
      </View>

      <SavedList />
    </>
  )
}
