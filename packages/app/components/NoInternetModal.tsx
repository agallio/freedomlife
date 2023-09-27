import { TouchableOpacity } from 'react-native'
import { Text, useSx, View } from 'dripsy'
import Modal from 'react-native-modal'

// Icons
import NoInternetIcon from './Icons/NoInternetIcon'

// Contexts
import { useNetworkConnectionContext } from 'app/provider/network'

export default function NoInternetModal({
  onRetryPress,
}: {
  onRetryPress?: () => void
}) {
  const sx = useSx()

  const { isOffline } = useNetworkConnectionContext()

  return (
    <Modal
      isVisible={isOffline}
      animationInTiming={600}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
    >
      <View
        sx={{
          backgroundColor: 'tab',
          paddingX: 24,
          paddingTop: 20,
          paddingBottom: 40,
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <NoInternetIcon style={{ width: 160, height: 160, marginBottom: 12 }} />
        <Text
          sx={{
            fontSize: 'xl',
            fontWeight: '800',
            color: 'text',
          }}
        >
          Tidak Ada Koneksi.
        </Text>

        <View sx={{ width: '100%' }}>
          <TouchableOpacity
            style={sx({
              padding: 'md',
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: 'retryInternetButton',
            })}
            onPress={
              typeof onRetryPress === 'function' ? onRetryPress : () => {}
            }
          >
            <Text
              sx={{ textAlign: 'center', color: 'text', fontWeight: '800' }}
            >
              Coba Lagi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
