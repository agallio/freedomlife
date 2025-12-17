import { type ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

type SunsetInfoGradientProps = {
  children: ReactNode
}

export default function SunsetInfoGradient({
  children,
}: SunsetInfoGradientProps) {
  return (
    <LinearGradient
      colors={['#5B3A7D', '#3D2659']}
      style={{
        position: 'relative',
        borderRadius: 8,
        height: 70,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        paddingLeft: 60,
        paddingRight: 16,
      }}
    >
      {children}
    </LinearGradient>
  )
}
