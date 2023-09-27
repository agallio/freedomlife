import {
  Linking,
  Platform,
  TouchableHighlight,
  useColorScheme,
} from 'react-native'
import { P, Text, useSx, View } from 'dripsy'
import { BlurTint, BlurView } from 'expo-blur'
import { useRouter } from 'solito/router'

// Components
import NewUserIcon from 'app/components/Icons/NewUserIcon'
import GradientCard from 'app/components/GradientCard'
import HomeScreenFooter from './HomeScreenFooter'

const colorScheme = {
  lightColorScheme: ['#93c5fd', '#818cf8'],
  darkColorScheme: ['#3b82f6', '#6366f1', '#a855f7'],
}

export default function NewUserCard() {
  const sx = useSx()
  const nativeColorScheme = useColorScheme()
  const { push } = useRouter()

  return (
    <GradientCard
      title="Baru Pertama Kali?"
      options={{
        ...colorScheme,
        isLastChild: true,
        startColorConfig: [1, 0],
        endColorConfig: [0, 0],
        titleColor: 'newUserCardTitle',
      }}
      footer={
        <HomeScreenFooter>
          <TouchableHighlight
            style={sx({
              overflow: 'hidden',
              borderRadius: 9999,
              width: '100%',
            })}
            onPress={async () => {
              if (Platform.OS === 'web') {
                push('/learn')
                return
              }

              const guideUrl = 'https://freedomlife.id/learn'
              await Linking.canOpenURL(guideUrl)
              Linking.openURL(guideUrl)
            }}
            underlayColor={sx({ bg: '#065f46' })}
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
              <Text
                sx={{
                  color: 'newUserCardTitle',
                  fontSize: 'sm',
                  fontWeight: '800',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: 1.1,
                }}
                // @ts-ignore
                // https://github.com/nandorojo/dripsy/issues/206
                style={
                  Platform.OS === 'web' ? { fontWeight: '800' } : undefined
                }
              >
                Pelajari Lebih Lanjut
              </Text>
            </BlurView>
          </TouchableHighlight>
        </HomeScreenFooter>
      }
    >
      <View sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <NewUserIcon style={{ width: 160, height: 160 }} />
        <View
          sx={{ marginY: 'md', alignItems: 'center', justifyContent: 'center' }}
        >
          <P
            sx={{
              color: 'newUserCardTitle',
              marginBottom: 'xs',
              textAlign: 'center',
            }}
          >
            Baru pertama kali buka freedomlife?
          </P>
          <P sx={{ color: 'newUserCardTitle', textAlign: 'center' }}>
            Yuk belajar cara pakainya!
          </P>
        </View>
      </View>
    </GradientCard>
  )
}
