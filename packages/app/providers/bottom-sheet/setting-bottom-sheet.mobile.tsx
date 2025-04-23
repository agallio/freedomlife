import {
  createContext,
  useCallback,
  useContext,
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
  BottomSheetBackdrop,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'

// Components
import { Text } from '../../components/text'

// Screen
import SettingScreen from '../../features/read/modals/setting'

type SettingSheetContextType = {
  showSheet: () => void
  dismiss: () => void
}

const SettingSheetContext = createContext<SettingSheetContextType>({
  showSheet: () => {},
  dismiss: () => {},
})

export function SettingSheetProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const { dismiss } = useBottomSheetModal()
  const { width } = useWindowDimensions()

  // Refs
  const settingSheetRef = useRef<BottomSheetModal>(null)

  // Methods
  const showSheet = useCallback(() => {
    settingSheetRef.current?.present()
  }, [])

  return (
    <SettingSheetContext.Provider value={{ showSheet, dismiss }}>
      {children}

      <BottomSheetModal
        ref={settingSheetRef}
        name="setting-sheet"
        snapPoints={[270]}
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
                  Pengaturan
                </RNText>
              ) : (
                <Text
                  customFontSize="custom"
                  customFontWeight="font-semibold"
                  className="text-[17px]"
                >
                  Pengaturan
                </Text>
              )}
            </View>

            <View className="flex-1 items-end">
              <TouchableOpacity onPress={() => dismiss()}>
                <RNText className="text-[16px] text-emerald-900 dark:text-white">
                  Tutup
                </RNText>
              </TouchableOpacity>
            </View>
          </View>

          <SettingScreen />
        </BottomSheetView>
      </BottomSheetModal>
    </SettingSheetContext.Provider>
  )
}

export function useSettingSheetContext() {
  const value = useContext(SettingSheetContext)

  if (!value && process.env.NODE_ENV === 'development') {
    console.log(
      'useSettingSheetContext must be used within SettingSheetProvider',
    )
  }

  return value
}
