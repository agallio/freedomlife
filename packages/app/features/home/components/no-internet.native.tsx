import { View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { useRouter } from 'solito/router'

// Components
import { Header, Text } from '../../../components/text'
import { Button } from '../../../components/button'

// Icon Components
import NoInternetIcon from '../../../components/icons/no-internet-icon'

// Contexts
import { useNetworkConnectionContext } from '../../../providers/network'
import { useReadLocalDatabaseNative } from '../../../features/read/local-databases/native/index.native'
import { useReadPassageContext } from '../../../features/read/contexts/read-passage.context'

/**
 * Native only! (iOS + Android)
 */
export default function NoInternetModal() {
  const router = useRouter()
  const { openOfflineModal, setOpenOfflineModal } =
    useNetworkConnectionContext()
  const { downloadedData } = useReadLocalDatabaseNative()
  const { setGuidedEnable, setSelectedBiblePassage, setSelectedBibleVersion } =
    useReadPassageContext()

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
      setOpenOfflineModal(false)
      setGuidedEnable(false)
      setSelectedBiblePassage('kej-1')
      setSelectedBibleVersion(firstDownloadedData as string)
      router.push('/read')
    }
  }

  return (
    <ReactNativeModal
      isVisible={openOfflineModal}
      animationInTiming={600}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
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
    </ReactNativeModal>
  )
}
