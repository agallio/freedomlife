import { useColorScheme } from 'react-native'
import { useSx } from 'dripsy'
import { BlurView } from 'expo-blur'

// Types
import type { PropsWithChildren } from 'react'

export default function HomeScreenFooter({ children }: PropsWithChildren<{}>) {
  const sx = useSx()
  const colorScheme = useColorScheme()

  return (
    <BlurView
      intensity={colorScheme === 'light' ? 10 : 20}
      tint="dark"
      style={sx({
        paddingX: 'md',
        paddingY: 12,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      })}
    >
      {children}
    </BlurView>
  )
}
