import { useColorScheme } from 'react-native'
import { Skeleton as MotiSkeleton } from 'moti/skeleton'

export type SkeletonProps = {
  width: number | string
  height: number | string
  circle?: boolean
}

export default function Skeleton({ width, height, circle }: SkeletonProps) {
  const colorScheme = useColorScheme()

  return (
    <MotiSkeleton
      radius={circle ? 'round' : 8}
      colors={
        colorScheme === 'light'
          ? ['rgba(0,0,0,0.15)', 'transparent']
          : ['rgba(255,255,255,0.2)', 'transparent']
      }
      width={(width as number) || 20}
      height={(height as number) || 20}
    />
  )
}
