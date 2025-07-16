import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type PropsWithChildren,
} from 'react'
import {
  useColorScheme,
  View,
  Text as RNText,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet'
import { useStore } from 'zustand'

// Screen
import SaverScreen from '../../../features/read/modals/saver'

// Components
import { Text } from '../../../components/text'

// Store
import {
  createSaverSheetStore,
  type SaverSheetStore,
} from './saver-bottom-sheet.store'

// Contexts
import { useReadPassageGeneralContext } from '../../../features/read/contexts/read-passage.context'

type SaverSheetStoreApi = ReturnType<typeof createSaverSheetStore>

type SaverSheetActionsMobileContextType = {
  showSaverSheet: () => void
  dismissSaverSheet: () => void
}

const SaverSheetStoreMobileContext = createContext<
  SaverSheetStoreApi | undefined
>(undefined)
const SaverSheetActionsMobileContext = createContext<
  SaverSheetActionsMobileContextType | undefined
>(undefined)

export function SaverSheetMobileProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const { dismiss } = useBottomSheetModal()
  const { width } = useWindowDimensions()
  const selectedText = useReadPassageGeneralContext(
    (state) => state.selectedText,
  )
  const { updateSelectedText } = useReadPassageGeneralContext(
    (state) => state.actions,
  )

  // Refs
  const saverSheetRef = useRef<BottomSheetModal>(null)
  const saverSheetStoreRef = useRef<SaverSheetStoreApi | null>(null)
  if (saverSheetStoreRef.current === null) {
    saverSheetStoreRef.current = createSaverSheetStore()
  }

  // Constants
  const fastAnimationConfigs = useBottomSheetSpringConfigs({
    damping: 50,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    stiffness: 800,
  })

  // Methods
  const showSaverSheet = useCallback(() => {
    saverSheetRef.current?.present()
  }, [])

  const dismissAndReset = useCallback(() => {
    dismiss()
    updateSelectedText([])
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      saverSheetStoreRef.current?.setState({
        saverSheetOpen: true,
      })
    } else if (index === -1) {
      saverSheetStoreRef.current?.setState({
        saverSheetOpen: false,
      })
    }
  }, [])

  // Effects
  useEffect(() => {
    if (selectedText.length > 0) {
      showSaverSheet()
    } else {
      saverSheetRef.current?.dismiss()
    }
  }, [selectedText.length])

  return (
    <SaverSheetStoreMobileContext.Provider value={saverSheetStoreRef.current}>
      <SaverSheetActionsMobileContext.Provider
        value={{
          showSaverSheet,
          dismissSaverSheet: dismiss,
        }}
      >
        {children}
      </SaverSheetActionsMobileContext.Provider>

      <BottomSheetModal
        ref={saverSheetRef}
        name="saver-sheet"
        snapPoints={[280]}
        handleComponent={null}
        backdropComponent={undefined}
        enableDynamicSizing={false}
        enablePanDownToClose={false}
        animationConfigs={fastAnimationConfigs}
        backgroundStyle={{
          backgroundColor: colorScheme === 'light' ? '#f3f4f6' : '#1f2937',
          borderWidth: 1,
          borderColor: colorScheme === 'light' ? '#e6e6e6' : '#374151',
          borderTopEndRadius: 24,
          borderTopStartRadius: 24,

          // Shadows
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        style={{ marginHorizontal: width > 500 ? width * 0.2 : 0 }}
        onChange={handleSheetChanges}
      >
        <BottomSheetView>
          <View className="flex flex-row items-center justify-between rounded-t-[24px] border border-[#e6e6e6] bg-gray-50 px-5 py-4 dark:border-[#374151] dark:bg-gray-700">
            {/* Empty view for spacing */}
            <View className="flex-1" />

            <View className="w-[170px] shrink-0 items-center">
              {Platform.OS === 'ios' ? (
                <RNText className="text-[17px] font-semibold text-emerald-900 dark:text-white">
                  Simpan & Bagikan
                </RNText>
              ) : (
                <Text
                  customFontSize="custom"
                  customFontWeight="font-semibold"
                  className="text-[17px]"
                >
                  Simpan & Bagikan
                </Text>
              )}
            </View>

            <View className="flex-1 items-end">
              <TouchableOpacity onPress={() => dismissAndReset()}>
                <RNText className="text-[16px] text-emerald-900 dark:text-white">
                  Tutup
                </RNText>
              </TouchableOpacity>
            </View>
          </View>

          <SaverScreen dismissSaverSheet={() => dismissAndReset()} />
        </BottomSheetView>
      </BottomSheetModal>
    </SaverSheetStoreMobileContext.Provider>
  )
}

export function useSaverSheetActionsMobileContext() {
  const value = useContext(SaverSheetActionsMobileContext)

  if (!value) {
    throw new Error(
      'useSaverSheetActionsMobileContext must be used within SaverSheetMobileProvider',
    )
  }

  return value
}

export function useSaverSheetStoreMobileContext<T>(
  selector: (_store: SaverSheetStore) => T,
) {
  const value = useContext(SaverSheetStoreMobileContext)

  if (!value) {
    throw new Error(
      'useSaverSheetStoreMobileContext must be used within SaverSheetMobileProvider',
    )
  }

  return useStore(value, selector)
}
