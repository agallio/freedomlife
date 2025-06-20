import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react'
import {
  Platform,
  useColorScheme,
  useWindowDimensions,
  View,
  Text as RNText,
  TouchableOpacity,
} from 'react-native'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useStore } from 'zustand'

// Components
import { Text } from '../../../components/text'

// Screens
import SavedFiltersSelectionScreen from '../../../features/saved/modals/saved-filters-selection.mobile'

// Store
import {
  createSavedFiltersSheetStore,
  type SavedFiltersSheetStore,
} from './saved-filters-bottom-sheet.store'

type SavedFiltersSheetStoreApi = ReturnType<typeof createSavedFiltersSheetStore>

type SavedFiltersSheetActionsMobileContextType = {
  showSavedFiltersSheet: () => void
  dismissSavedFiltersSheet: () => void
}

const SavedFiltersSheetStoreMobileContext = createContext<
  SavedFiltersSheetStoreApi | undefined
>(undefined)
const SavedFiltersSheetActionsMobileContext = createContext<
  SavedFiltersSheetActionsMobileContextType | undefined
>(undefined)

export function SavedFiltersSheetMobileProvider({
  children,
}: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const { width } = useWindowDimensions()

  // Refs
  const savedFiltersSheetRef = useRef<BottomSheetModal>(null)
  const savedFiltersSheetStoreRef = useRef<SavedFiltersSheetStoreApi | null>(
    null,
  )
  if (savedFiltersSheetStoreRef.current === null) {
    savedFiltersSheetStoreRef.current = createSavedFiltersSheetStore()
  }

  // Methods
  const showSavedFiltersSheet = useCallback(() => {
    savedFiltersSheetRef.current?.present()
  }, [])

  const dismissSavedFiltersSheet = useCallback(() => {
    savedFiltersSheetRef.current?.dismiss()
  }, [])

  return (
    <SavedFiltersSheetStoreMobileContext.Provider
      value={savedFiltersSheetStoreRef.current}
    >
      <SavedFiltersSheetActionsMobileContext.Provider
        value={{
          showSavedFiltersSheet,
          dismissSavedFiltersSheet,
        }}
      >
        {children}
      </SavedFiltersSheetActionsMobileContext.Provider>

      <BottomSheetModal
        ref={savedFiltersSheetRef}
        name="saved-filters-sheet"
        snapPoints={[400]}
        handleComponent={null}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        enableDynamicSizing={false}
        backgroundStyle={{
          backgroundColor: colorScheme === 'light' ? '#f3f4f6' : '#1f2937',
        }}
        style={{ marginHorizontal: width > 500 ? width * 0.2 : 0 }}
      >
        <BottomSheetView>
          <View className="flex flex-row items-center justify-between rounded-t-[24px] border-b border-[#e6e6e6] px-5 py-4 dark:border-[#374151]">
            {/* Empty view for spacing */}
            <View className="flex-1" />

            <View className="flex-1 items-center">
              {Platform.OS === 'ios' ? (
                <RNText className="text-[17px] font-semibold text-emerald-900 dark:text-white">
                  Pilih Filter
                </RNText>
              ) : (
                <Text
                  customFontSize="custom"
                  customFontWeight="font-semibold"
                  className="text-[17px]"
                >
                  Pilih Filter
                </Text>
              )}
            </View>

            <View className="flex-1 items-end">
              <TouchableOpacity onPress={() => dismissSavedFiltersSheet()}>
                <RNText className="text-[16px] text-emerald-900 dark:text-white">
                  Tutup
                </RNText>
              </TouchableOpacity>
            </View>
          </View>

          <SavedFiltersSelectionScreen />
        </BottomSheetView>
      </BottomSheetModal>
    </SavedFiltersSheetStoreMobileContext.Provider>
  )
}

export function useSavedFiltersSheetActionsMobileContext() {
  const value = useContext(SavedFiltersSheetActionsMobileContext)

  if (!value) {
    throw new Error(
      'useSavedFiltersSheetActionsMobileContext must be used within SavedFiltersSheetMobileProvider',
    )
  }

  return value
}

export function useSavedFiltersSheetStoreMobileContext<T>(
  selector: (_store: SavedFiltersSheetStore) => T,
) {
  const value = useContext(SavedFiltersSheetStoreMobileContext)

  if (!value) {
    throw new Error(
      'useSavedFiltersSheetStoreMobileContext must be used within SavedFiltersSheetMobileProvider',
    )
  }

  return useStore(value, selector)
}
