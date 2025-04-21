import { useMemo } from 'react'
import { Platform, View } from 'react-native'

// Components
import GradientCard from '../../../components/gradient-card'
import { Header, Text } from '../../../components/text'
import { Button } from '../../../components/button'
import Skeleton from '../../../components/skeleton'

// Contexts
import { useReadPassageContext } from '../../read/contexts/read-passage.context'

// Queries
import { useGuideTodayQuery } from '../../../hooks/use-guide-query'

// Utils
import { cn } from '../../../utils/helpers'
import dayjs from '../../../utils/dayjs'

// Types
import type { GuideDataResponse } from '../../../types'

type PassageCardProps = {
  redirectToReadScreen: () => void
}

export default function PassageCard({
  redirectToReadScreen,
}: PassageCardProps) {
  const {
    setGuidedEnable,
    setGuidedDate,
    setGuidedSelectedPassage,
    setSelectedBibleVersion,
  } = useReadPassageContext()

  // Queries
  const { data, isError, isLoading } = useGuideTodayQuery()

  // Methods
  const onClick = async () => {
    setGuidedEnable(true)
    setGuidedDate('')
    setGuidedSelectedPassage('pl-1')
    setSelectedBibleVersion('tb')

    redirectToReadScreen()
  }

  return (
    <GradientCard
      variants="passage"
      title={
        <View className="flex w-full justify-center px-4 py-2">
          <Header aria-level={2} className="leading-snug">
            Panduan Baca Hari Ini
          </Header>
          <Text>{dayjs().format('dddd, DD MMMM YYYY')}</Text>
        </View>
      }
      footer={
        !isError ? (
          <View className="w-full px-4 py-3">
            {isLoading ? (
              <Skeleton width="100%" height={36} circle />
            ) : (
              <Button
                fullWidth
                text="Baca"
                variant="card"
                className={cn(
                  'bg-emerald-700 dark:bg-gray-800/30',
                  Platform.OS === 'web' &&
                    'web:hover:bg-emerald-600 web:dark:hover:bg-gray-900/30 web:active:bg-emerald-600 web:dark:active:bg-gray-900/30',
                )}
                textClassName="text-sm text-white"
                onClick={onClick}
              />
            )}
          </View>
        ) : undefined
      }
      className={cn(
        Platform.OS === 'android'
          ? 'shadow'
          : 'shadow-sm shadow-green-300 dark:shadow-green-800',
      )}
    >
      <View className="gap-3 px-4 py-3">
        {isError ? (
          <Text>
            Panduan baca tidak tersedia. Pastikan koneksi internet Anda dan
            mohon coba beberapa saat lagi.
          </Text>
        ) : (
          [...Array(3).keys()].map((i) => (
            <View key={i}>
              {isLoading ? (
                <Skeleton width={200} height={41} />
              ) : (
                <PassageItem data={data} index={i} />
              )}
            </View>
          ))
        )}
      </View>
    </GradientCard>
  )
}

function PassageItem({
  data,
  index,
}: {
  data?: GuideDataResponse
  index: number
}) {
  const passageValue = useMemo(() => {
    switch (index) {
      case 0:
        return { text: data?.pl_name || '', note: 'Perjanjian Lama' }
      case 1:
        return { text: data?.pb_name || '', note: 'Kitab Injil' }
      case 2:
        return { text: data?.in_name || '', note: 'Kitab Rasuli' }

      default:
        return { text: '', note: '' }
    }
  }, [data, index])

  return (
    <>
      <Text customFontWeight="font-semibold" className="leading-snug">
        {passageValue.text}
      </Text>
      <Text
        customFontSize="text-sm"
        className="leading-snug dark:text-emerald-100"
      >
        {passageValue.note}
      </Text>
    </>
  )
}
