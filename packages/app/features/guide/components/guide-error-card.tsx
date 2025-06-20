import { View } from 'react-native'

// Components
import { Card } from '../../../components/card'
import { Header, Text } from '../../../components/text'

export default function GuideErrorCard() {
  return (
    <Card
      title={
        <View className="px-4 py-2">
          <Header aria-level={2}>Panduan Tidak Tersedia</Header>
        </View>
      }
    >
      <View className="px-4 py-2">
        <Text>
          Gagal memuat panduan untuk bulan ini. Silakan coba beberapa saat lagi.
        </Text>
      </View>
    </Card>
  )
}
