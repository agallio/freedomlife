import { type ReactNode } from 'react'
import { View } from 'react-native'

type SunsetInfoGradientProps = {
  children: ReactNode
}

export default function SunsetInfoGradient({
  children,
}: SunsetInfoGradientProps) {
  return (
    <View className="relative flex h-[70px] flex-row items-center overflow-hidden rounded-lg bg-gradient-to-b from-[#5B3A7D] to-[#3D2659] pl-[3.75rem] pr-4 min-[426px]:pl-20">
      {children}
    </View>
  )
}
