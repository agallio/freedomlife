import { memo } from 'react'
import { Platform, TouchableOpacity, useColorScheme } from 'react-native'
import { BlurTint, BlurView } from 'expo-blur'
import { P, Text, View, useSx } from 'dripsy'
import { Skeleton } from 'moti/skeleton'
import { BookOpenIcon, CheckBadgeIcon } from 'react-native-heroicons/solid'
import * as Burnt from 'burnt'

// Components
import Card from 'app/components/Card'
import GradientCard from 'app/components/GradientCard'

// Colors
import { skeletonColors } from 'app/provider/dripsy/colors'

// Utils
import dayjs from 'app/utils/dayjs'
import { guideValueArray } from 'app/utils/constants'

// Types
import type { GuideDataResponse } from 'app/types'

const gradientColorScheme = {
  lightColorScheme: ['#34d399', '#a7f3d0'],
  darkColorScheme: ['rgba(16,185,129,1)', 'rgba(0,212,255,1)'],
}

function GuideItemCard({
  isLoading,
  isError,
  web,
  item,
  isLastChild,
  hasBeenRead,
  onGuidePress,
}: {
  isLoading: boolean
  isError?: boolean
  web?: boolean
  item?: GuideDataResponse
  isLastChild?: boolean
  hasBeenRead?: boolean
  onGuidePress: (_: string) => void
}) {
  const sx = useSx()
  const colorScheme = useColorScheme()

  // Methods
  const openToast = () => {
    Burnt.toast({
      preset: 'custom',
      title:
        Platform.OS === 'ios'
          ? 'Panduan Telah Dibaca!'
          : `Panduan Telah Dibaca!${item?.date ? `\n(${item.date})` : ''}`,
      message:
        Platform.OS === 'ios' ? (item?.date ? `(${item.date})` : '') : '',
      duration: 1.5,
      icon: {
        ios: {
          name: 'checkmark.circle',
          color: colorScheme === 'light' ? '#047857' : '#6ee7b7',
        },
      },
    })
  }

  if (isError) {
    return (
      <Card
        title="Panduan Bulan Ini Tidak Tersedia"
        options={{
          backgroundColor: 'guideCard',
          titleColor: 'passageCardTitle',
          subtitleColor: 'passageCardTitle',
        }}
      >
        <View sx={{ marginTop: 'xs', marginBottom: 8 }}>
          <P allowFontScaling={false} sx={{ color: 'tabText' }}>
            Ada kesalahan saat mengambil data panduan. Mohon coba beberapa saat
            lagi.
          </P>
        </View>
      </Card>
    )
  }

  if (item!.date === dayjs().format('DD-MM-YYYY')) {
    return (
      <GradientCard
        title={dayjs(item?.date, 'DD-MM-YYYY').format('dddd')}
        subtitle={dayjs(item?.date, 'DD-MM-YYYY').format('DD MMMM YYYY')}
        actionButton={
          <View sx={{ flexDirection: 'row' }}>
            {hasBeenRead && (
              <TouchableOpacity
                style={{
                  overflow: 'hidden',
                  borderRadius: 9999,
                  marginRight: 8,
                }}
                onPress={openToast}
              >
                <BlurView
                  intensity={colorScheme === 'light' ? 60 : 40}
                  blurReductionFactor={0}
                  tint={colorScheme as BlurTint}
                  style={sx({ padding: 12, borderRadius: 9999 })}
                >
                  <CheckBadgeIcon size={24} style={sx({ color: 'tabText' })} />
                </BlurView>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{ overflow: 'hidden', borderRadius: 9999 }}
              onPress={() => onGuidePress(item!.date as string)}
            >
              <BlurView
                intensity={colorScheme === 'light' ? 60 : 40}
                blurReductionFactor={0}
                tint={colorScheme as BlurTint}
                style={sx({ padding: 12, borderRadius: 9999 })}
              >
                <BookOpenIcon size={24} style={sx({ color: 'tabText' })} />
              </BlurView>
            </TouchableOpacity>
          </View>
        }
        options={{
          ...gradientColorScheme,
          isLastChild,
          lastChildPadding: web ? 120 : 210,
          titleColor: 'passageCardTitle',
          subtitleColor: 'passageCardTitle',
        }}
      >
        <View sx={{ marginTop: 'xs', marginBottom: 8 }}>
          {guideValueArray.map((itemKey) => (
            <View
              key={itemKey}
              sx={{
                marginBottom:
                  itemKey.includes('pl') || itemKey.includes('pb')
                    ? 'md'
                    : undefined,
              }}
            >
              <View>
                <Text
                  allowFontScaling={false}
                  sx={{
                    color: 'passageCardTitle',
                    fontSize: 'lg',
                    fontWeight: '800',
                    marginBottom: 6,
                  }}
                  // @ts-ignore
                  // https://github.com/nandorojo/dripsy/issues/206
                  style={
                    Platform.OS === 'web' ? { fontWeight: '800' } : undefined
                  }
                >
                  {item![itemKey]}
                </Text>
                <P allowFontScaling={false} sx={{ color: 'passageCardTitle' }}>
                  {itemKey.includes('pl')
                    ? 'Perjanjian Lama'
                    : itemKey.includes('pb')
                      ? 'Kitab Injil'
                      : 'Kitab Rasuli'}
                </P>
              </View>
            </View>
          ))}
        </View>
      </GradientCard>
    )
  }

  return (
    <Card
      title={item?.date ? dayjs(item.date, 'DD-MM-YYYY').format('dddd') : ` `}
      subtitle={
        item?.date ? dayjs(item.date, 'DD-MM-YYYY').format('DD MMMM YYYY') : ` `
      }
      actionButton={
        !isLoading ? (
          <View sx={{ flexDirection: 'row' }}>
            {hasBeenRead && (
              <TouchableOpacity
                style={sx({
                  bg: 'tabActive',
                  padding: 12,
                  borderRadius: 9999,
                  marginRight: 8,
                })}
                onPress={openToast}
              >
                <CheckBadgeIcon size={24} style={sx({ color: 'tabText' })} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={sx({ bg: 'tabActive', padding: 12, borderRadius: 9999 })}
              onPress={() => onGuidePress(item!.date as string)}
            >
              <BookOpenIcon size={24} style={sx({ color: 'tabText' })} />
            </TouchableOpacity>
          </View>
        ) : null
      }
      options={{
        isLoading,
        isLastChild,
        lastChildPadding: web ? 120 : 210,
        backgroundColor: 'guideCard',
        titleColor: 'passageCardTitle',
        subtitleColor: 'passageCardTitle',
      }}
    >
      <View sx={{ marginTop: 'xs', marginBottom: 8 }}>
        {guideValueArray.map((itemKey) => (
          <View
            key={itemKey}
            sx={{
              marginBottom:
                itemKey.includes('pl') || itemKey.includes('pb')
                  ? 'md'
                  : undefined,
            }}
          >
            <Skeleton
              show={isLoading}
              width="100%"
              height={Platform.OS === 'android' ? 54 : 50}
              colors={skeletonColors(colorScheme)}
            >
              <View>
                <Text
                  allowFontScaling={false}
                  sx={{
                    color: 'passageCardTitle',
                    fontSize: 'lg',
                    fontWeight: '800',
                    marginBottom: 6,
                  }}
                  // @ts-ignore
                  // https://github.com/nandorojo/dripsy/issues/206
                  style={
                    Platform.OS === 'web' ? { fontWeight: '800' } : undefined
                  }
                >
                  {item![itemKey]}
                </Text>
                <P allowFontScaling={false} sx={{ color: 'passageCardTitle' }}>
                  {itemKey.includes('pl')
                    ? 'Perjanjian Lama'
                    : itemKey.includes('pb')
                      ? 'Kitab Injil'
                      : 'Kitab Rasuli'}
                </P>
              </View>
            </Skeleton>
          </View>
        ))}
      </View>
    </Card>
  )
}

export default memo(GuideItemCard)
