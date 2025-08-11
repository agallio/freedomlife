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
import SavedManageScreen from '../../../features/saved/modals/saved-manage.mobile'

// Store
import {
  createSavedManageSheetStore,
  type SavedManageSheetStore,
} from './saved-manage-bottom-sheet.store'

type SavedManageSheetStoreApi = ReturnType<typeof createSavedManageSheetStore>

type SavedManageSheetActionsMobileContextType = {
  showSavedManageSheet: () => void
  dismissSavedManageSheet: () => void
}

const SavedManageSheetStoreMobileContext = createContext<
  SavedManageSheetStoreApi | undefined
>(undefined)
const SavedManageSheetActionsMobileContext = createContext<
  SavedManageSheetActionsMobileContextType | undefined
>(undefined)

export function SavedManageSheetMobileProvider({
  children,
}: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const { width } = useWindowDimensions()

  // Refs
  const savedManageSheetRef = useRef<BottomSheetModal>(null)
  const savedManageSheetStoreRef = useRef<SavedManageSheetStoreApi | null>(null)
  if (savedManageSheetStoreRef.current === null) {
    savedManageSheetStoreRef.current = createSavedManageSheetStore()
  }

  // Methods
  const showSavedManageSheet = useCallback(() => {
    savedManageSheetRef.current?.present()
  }, [])

  const dismissSavedManageSheet = useCallback(() => {
    savedManageSheetRef.current?.dismiss()
  }, [])

  return (
    <SavedManageSheetStoreMobileContext.Provider
      value={savedManageSheetStoreRef.current}
    >
      <SavedManageSheetActionsMobileContext.Provider
        value={{
          showSavedManageSheet,
          dismissSavedManageSheet,
        }}
      >
        {children}
      </SavedManageSheetActionsMobileContext.Provider>

      <BottomSheetModal
        ref={savedManageSheetRef}
        name="saved-manage-sheet"
        snapPoints={[260]}
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
            <View className="w-[60px] shrink-0" />

            <View className="w-full flex-1 items-center">
              {Platform.OS === 'ios' ? (
                <RNText className="text-[17px] font-semibold text-emerald-900 dark:text-white">
                  Data Simpanan
                </RNText>
              ) : (
                <Text
                  customFontSize="custom"
                  customFontWeight="font-semibold"
                  className="text-[17px]"
                >
                  Data Simpanan
                </Text>
              )}
            </View>

            <View className="w-[60px] shrink-0 items-end">
              <TouchableOpacity onPress={() => dismissSavedManageSheet()}>
                <RNText className="text-[16px] text-emerald-900 dark:text-white">
                  Tutup
                </RNText>
              </TouchableOpacity>
            </View>
          </View>

          <SavedManageScreen />
        </BottomSheetView>
      </BottomSheetModal>
    </SavedManageSheetStoreMobileContext.Provider>
  )
}

export function useSavedManageSheetActionsMobileContext() {
  const value = useContext(SavedManageSheetActionsMobileContext)

  if (!value) {
    throw new Error(
      'useSavedManageSheetActionsMobileContext must be used within SavedManageSheetMobileProvider',
    )
  }

  return value
}

export function useSavedManageSheetStoreMobileContext<T>(
  selector: (_store: SavedManageSheetStore) => T,
) {
  const value = useContext(SavedManageSheetStoreMobileContext)

  if (!value) {
    throw new Error(
      'useSavedManageSheetStoreMobileContext must be used within SavedManageSheetMobileProvider',
    )
  }

  return useStore(value, selector)
}
