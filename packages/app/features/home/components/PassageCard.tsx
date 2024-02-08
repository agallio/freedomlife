import { Platform, TouchableHighlight, useColorScheme } from 'react-native'
import { ActivityIndicator, P, Text, useSx, View, useDripsyTheme } from 'dripsy'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { BlurTint, BlurView } from 'expo-blur'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'

// Components
import GradientCard from 'app/components/GradientCard'
import HomeScreenFooter from './HomeScreenFooter'

// Contexts
import { useReadPassageContext } from 'app/features/read/contexts/ReadPassageContext'

// Utils
import dayjs from 'app/utils/dayjs'
import { guideValueArray } from 'app/utils/constants'

// Queries
import { useGuideTodayQuery } from 'app/utils/hooks/useGuideQuery'

const colorScheme = {
  lightColorScheme: ['#34d399', '#a7f3d0'],
  darkColorScheme: ['rgba(16,185,129,1)', 'rgba(0,212,255,1)'],
}

export const { useParam } = createParam<{ passage: string }>()

export default function PassageCard() {
  const sx = useSx()
  const {
    theme: { colors },
  } = useDripsyTheme()
  const nativeColorScheme = useColorScheme()
  const { push } = useRouter()

  // Contexts
  const { setBibleVersion, setInGuide, setGuideDate, setGuidePassage } =
    useReadPassageContext()

  // Queries
  const { data, error, isLoading } = useGuideTodayQuery()

  return (
    <GradientCard
      title="Panduan Baca Hari Ini"
      subtitle={dayjs().format('dddd, DD MMMM YYYY')}
      options={{
        ...colorScheme,
        titleColor: 'passageCardTitle',
        subtitleColor: 'passageCardTitle',
      }}
      footer={
        !error ? (
          <HomeScreenFooter>
            <TouchableHighlight
              style={sx({
                overflow: 'hidden',
                borderRadius: 9999,
                width: '100%',
              })}
              onPress={() => {
                push('/read')
                setInGuide(true)
                setGuideDate('')
                setBibleVersion('tb')
                setGuidePassage('pl-1')
              }}
              underlayColor={sx({ bg: '#065f46' })}
              disabled={isLoading}
            >
              <BlurView
                intensity={nativeColorScheme === 'light' ? 50 : 40}
                tint={nativeColorScheme as BlurTint}
                style={sx({
                  width: '100%',
                  paddingY: 12,
                  paddingX: 'lg',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors!.tabText as string} />
                ) : (
                  <Text
                    allowFontScaling={false}
                    sx={{
                      color: 'tabText',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: 1.1,
                    }}
                    // @ts-ignore
                    // https://github.com/nandorojo/dripsy/issues/206
                    style={
                      Platform.OS === 'web' ? { fontWeight: '800' } : undefined
                    }
                  >
                    Baca
                  </Text>
                )}
              </BlurView>
            </TouchableHighlight>
          </HomeScreenFooter>
        ) : null
      }
    >
      <View sx={{ paddingTop: 'sm', paddingBottom: 12 }}>
        {error ? (
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing' }}
          >
            <P sx={{ color: 'passageCardTitle' }}>
              Terjadi kesalahan saat mengambil data panduan. Mohon coba beberapa
              saat lagi.
            </P>
          </MotiView>
        ) : (
          guideValueArray.map((item) => (
            <View
              key={item}
              sx={{
                marginBottom:
                  item.includes('pl') || item.includes('pb') ? 'md' : undefined,
              }}
            >
              <Skeleton
                show={isLoading}
                width={item.includes('pl') ? '90%' : '70%'}
                colors={
                  nativeColorScheme === 'dark'
                    ? ['#6ee7b7', '#67e8f9']
                    : ['#10b981', '#07da99']
                }
                height={Platform.OS === 'android' ? 52 : 48}
              >
                <View>
                  {data && (
                    <Text
                      allowFontScaling={false}
                      sx={{
                        color: 'passageCardTitle',
                        fontSize: 'lg',
                        fontWeight: '800',
                        marginBottom: 'xs',
                      }}
                      // @ts-ignore
                      // https://github.com/nandorojo/dripsy/issues/206
                      style={
                        Platform.OS === 'web'
                          ? { fontWeight: '800' }
                          : undefined
                      }
                    >
                      {data[item]}
                    </Text>
                  )}
                  <P
                    allowFontScaling={false}
                    sx={{ color: 'passageCardTitle' }}
                  >
                    {item.includes('pl')
                      ? 'Perjanjian Lama'
                      : item.includes('pb')
                        ? 'Kitab Injil'
                        : 'Kitab Rasuli'}
                  </P>
                </View>
              </Skeleton>
            </View>
          ))
        )}
      </View>
    </GradientCard>
  )
}
