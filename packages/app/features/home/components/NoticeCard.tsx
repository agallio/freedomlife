import { View, Text } from 'dripsy'

// Components
import GradientCard from 'app/components/GradientCard'

// Queries
import { useFlagQuery } from 'app/utils/hooks/useFlagQuery'

const colorScheme = {
  lightColorScheme: ['#d8b4fe', '#fca5a5'],
  darkColorScheme: ['#9333ea', '#ef4444'],
}

export default function NoticeCard() {
  const { data, isLoading } = useFlagQuery('2023_notice')

  if (
    isLoading ||
    !data ||
    !data.enable ||
    (data.enable && data.context.no_data)
  ) {
    return null
  }

  return (
    <GradientCard
      options={{
        ...colorScheme,
        startColorConfig: [1, 0],
        endColorConfig: [0, 0],
        insidePadding: { paddingX: 'sm', paddingY: 'xs' },
      }}
    >
      <View sx={{ paddingTop: 'sm', paddingBottom: 12 }}>
        <Text
          sx={{
            color: 'text',
            fontSize: 'sm',
            mb: 'sm',
            lineHeight: 20,
            textAlign: 'center',
          }}
        >
          Untuk meningkatkan kualitas layanan, freedomlife akan melakukan
          maintenance pada tanggal:
        </Text>
        <Text
          sx={{
            color: 'text',
            mb: 'sm',
            fontWeight: '600',
            lineHeight: 20,
            textAlign: 'center',
          }}
        >
          31 Desember 2022 22.00
        </Text>
        <Text
          sx={{
            color: 'text',
            fontSize: 'sm',
            lineHeight: 20,
            textAlign: 'center',
          }}
        >
          freedomlife akan segera kembali online setelah proses selesai. Terima
          kasih atas pengertian Anda.
        </Text>
      </View>
    </GradientCard>
  )
}
