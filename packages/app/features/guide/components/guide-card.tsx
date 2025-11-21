import { memo } from 'react'
import { Platform, View, useColorScheme } from 'react-native'
import { BookOpenIcon, CheckIcon } from 'react-native-heroicons/solid'

// Components
import { Card } from '../../../components/card'
import GradientCard from '../../../components/gradient-card'
import { Header, Text } from '../../../components/text'
import { IconButton } from '../../../components/button'
import Skeleton from '../../../components/skeleton'

// Utils
import { cn, getIconColor } from '../../../utils/helpers'
import dayjs from '../../../utils/dayjs'

// Types
import type { GuideDataResponse } from '../../../types'

type PassageEnum = 'pl_name' | 'pb_name' | 'in_name'

type GuideCardProps = {
  isActive?: boolean
  isLoading?: boolean
  isRead?: boolean
  item?: GuideDataResponse
  onGuideClick?: (_date: string) => void
  onCheckMarkClick?: (_date: string) => void
}

function BasicGuideCard({
  isRead,
  item,
  onGuideClick,
  onCheckMarkClick,
}: GuideCardProps) {
  const colorScheme = useColorScheme()

  const color = getIconColor(colorScheme)

  return (
    <Card
      title={
        <View className="flex w-full flex-row items-center justify-between px-4 py-2">
          <View className="flex flex-col justify-center">
            <Header
              aria-level={2}
              customFontSize="text-lg"
              className="leading-snug"
            >
              {dayjs(item!.date, 'DD-MM-YYYY').format('dddd')}
            </Header>

            <Text>
              {dayjs(item?.date, 'DD-MM-YYYY').format('DD MMMM YYYY')}
            </Text>
          </View>

          <View className="flex-row gap-2">
            {isRead && (
              <IconButton
                noShadow
                size="sm"
                variant="active"
                icon={
                  <CheckIcon
                    size={20}
                    className={
                      Platform.OS === 'web'
                        ? 'text-emerald-900 dark:text-white'
                        : undefined
                    }
                    color={Platform.OS !== 'web' ? color : undefined}
                  />
                }
                onClick={() => onCheckMarkClick?.(item!.date!)}
              />
            )}

            <IconButton
              noShadow
              size="sm"
              variant="active"
              icon={
                <BookOpenIcon
                  size={20}
                  className={
                    Platform.OS === 'web'
                      ? 'text-emerald-900 dark:text-white'
                      : undefined
                  }
                  color={Platform.OS !== 'web' ? color : undefined}
                />
              }
              onClick={() => onGuideClick?.(item!.date!)}
            />
          </View>
        </View>
      }
    >
      <View className="gap-3 px-4 py-3">
        {['pl_name', 'pb_name', 'in_name'].map((key) => (
          <View key={key}>
            <Text customFontWeight="font-semibold" className="leading-snug">
              {item![key as PassageEnum]}
            </Text>
            <Text
              customFontSize="text-sm"
              className="leading-snug text-emerald-800 dark:text-gray-300"
            >
              {key.includes('pl')
                ? 'Perjanjian Lama'
                : key.includes('pb')
                  ? 'Kitab Injil'
                  : 'Kitab Rasuli'}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  )
}

function ActiveGuideCard({
  isRead,
  item,
  onGuideClick,
  onCheckMarkClick,
}: GuideCardProps) {
  return (
    <GradientCard
      variants="passage"
      title={
        <View className="flex w-full flex-row items-center justify-between px-4 py-2">
          <View className="flex flex-col justify-center">
            <Header aria-level={2} className="leading-snug">
              {dayjs(item!.date, 'DD-MM-YYYY').format('dddd')}
            </Header>

            <Text>
              {dayjs(item?.date, 'DD-MM-YYYY').format('DD MMMM YYYY')}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            {isRead && (
              <IconButton
                noShadow
                size="sm"
                variant="custom"
                className="bg-emerald-700 web:hover:bg-emerald-800 web:active:bg-emerald-800 dark:bg-gray-800/30 web:dark:hover:bg-gray-800/50 web:dark:active:bg-gray-800/50"
                icon={
                  <CheckIcon
                    size={20}
                    className={Platform.OS === 'web' ? 'text-white' : undefined}
                    color={Platform.OS !== 'web' ? '#ffffff' : undefined}
                  />
                }
                onClick={() => onCheckMarkClick?.(item!.date!)}
              />
            )}

            <IconButton
              noShadow
              size="sm"
              variant="custom"
              className="border border-emerald-600 bg-emerald-700 web:hover:bg-emerald-800 web:active:bg-emerald-800 dark:border-transparent dark:bg-gray-800/30 web:dark:hover:bg-gray-800/50 web:dark:active:bg-gray-800/50"
              icon={
                <BookOpenIcon
                  size={20}
                  className={Platform.OS === 'web' ? 'text-white' : undefined}
                  color={Platform.OS !== 'web' ? '#ffffff' : undefined}
                />
              }
              onClick={() => onGuideClick?.(item!.date!)}
            />
          </View>
        </View>
      }
      className={cn(
        Platform.OS === 'android'
          ? 'shadow'
          : 'shadow-sm shadow-green-300 dark:shadow-green-800',
      )}
    >
      <View className="gap-3 px-4 py-3">
        {['pl_name', 'pb_name', 'in_name'].map((key) => (
          <View key={key}>
            <Text customFontWeight="font-semibold" className="leading-snug">
              {item![key as PassageEnum]}
            </Text>
            <Text
              customFontSize="text-sm"
              className="leading-snug dark:text-emerald-100"
            >
              {key.includes('pl')
                ? 'Perjanjian Lama'
                : key.includes('pb')
                  ? 'Kitab Injil'
                  : 'Kitab Rasuli'}
            </Text>
          </View>
        ))}
      </View>
    </GradientCard>
  )
}

function LoadingGuideCard() {
  return (
    <Card
      title={
        <View className="flex w-full flex-row items-center justify-between px-4 py-2">
          <View className="justify-centerg flex flex-col gap-1">
            <Skeleton width={100} height={25} />
            <Skeleton width={130} height={20} />
          </View>

          <Skeleton circle width={36} height={36} />
        </View>
      }
    >
      <View className="gap-4 px-4 py-3">
        {[1, 2, 3].map((i) => (
          <View key={i}>
            <Skeleton width={200} height={38.5} />
          </View>
        ))}
      </View>
    </Card>
  )
}

function GuideCard(props: GuideCardProps) {
  if (props.isLoading) {
    return <LoadingGuideCard />
  }

  if (props.isActive) {
    return <ActiveGuideCard {...props} />
  }

  return <BasicGuideCard {...props} />
}

export default memo(GuideCard)
