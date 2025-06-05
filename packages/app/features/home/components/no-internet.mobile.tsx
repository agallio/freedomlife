import { useEffect, useRef } from 'react'
import { useColorScheme, useWindowDimensions, View } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

// Components
import { Header, Text } from '../../../components/text'
import { Button } from '../../../components/button'

// Icon Components
import NoInternetIcon from '../../../components/icons/no-internet-icon'

// Contexts
import { useReadLocalDatabaseMobile } from '../../read/local-databases/mobile/index.mobile'
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '../../read/contexts/read-passage.context'

/**
 * Native only! (iOS + Android)
 */
export default function NoInternetModal({
  openOfflineModal,
  setOpenOfflineModal,
  redirectToReadScreen,
}: {
  openOfflineModal: boolean
  setOpenOfflineModal: (_: boolean) => void
  redirectToReadScreen: () => void
}) {
  const colorScheme = useColorScheme()
  const { width } = useWindowDimensions()
  const { downloadedData } = useReadLocalDatabaseMobile()
  const { setGuidedEnabled, setSelectedBiblePassage } =
    useReadPassagePersistedContext()
  const setSelectedBibleVersion = useReadPassageGeneralContext(
    (state) => state.actions.setSelectedBibleVersion,
  )

  // Refs
  const noInternetSheetRef = useRef<BottomSheetModal>(null)

  // Constants
  const isAnyDownloadedData = Object.values(downloadedData).some(
    (i) => i === 1189,
  )
  const firstDownloadedData = Object.keys(downloadedData).find(
    (i) => downloadedData[i] === 1189,
  )

  // Methods
  const onReadClick = () => {
    if (isAnyDownloadedData && firstDownloadedData) {
      noInternetSheetRef.current?.close()
      setOpenOfflineModal(false)
      setGuidedEnabled(false)
      setSelectedBiblePassage('kej-1')
      setSelectedBibleVersion(firstDownloadedData as string)
      redirectToReadScreen()
    }
  }

  // Effects
  useEffect(() => {
    if (!noInternetSheetRef.current) return

    if (openOfflineModal) {
      noInternetSheetRef.current?.present()
    } else {
      noInternetSheetRef.current?.forceClose()
    }
  }, [openOfflineModal])

  return (
    <BottomSheetModal
      ref={noInternetSheetRef}
      name="setting-sheet"
      snapPoints={[400]}
      handleComponent={null}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="none"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      backgroundStyle={{
        backgroundColor: colorScheme === 'light' ? '#ffffff' : '#1f2937',
      }}
      style={{ marginHorizontal: width > 500 ? width * 0.2 : 0 }}
    >
      <BottomSheetView>
        <View className="items-center justify-center gap-2 rounded-t-2xl bg-white pb-12 pt-4 dark:bg-gray-800">
          <NoInternetIcon style={{ width: 160, height: 160 }} />

          <Header className="text-center">Tidak Ada Koneksi Internet.</Header>

          {isAnyDownloadedData ? (
            <View className="w-full gap-4 px-8">
              <Text className="text-center">
                {`Anda telah mengunduh Alkitab.\nBaca Alkitab secara offline?`}
              </Text>
              <Button
                fullWidth
                text="Baca Alkitab"
                variant="passage"
                onClick={onReadClick}
              />
            </View>
          ) : (
            <Text className="text-center leading-snug">
              Pastikan Anda memiliki koneksi internet untuk menggunakan aplikasi
              freedomlife.
            </Text>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}
