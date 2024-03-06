// Utils
import { cn } from '../../utils/helpers'

// Types
import type { SkeletonProps } from '.'

export default function SkeletonWeb({ width, height, circle }: SkeletonProps) {
  return (
    <div
      className={cn(
        'inline-block animate-pulse bg-black/30 dark:bg-white/30',
        circle ? 'rounded-full' : 'rounded-lg',
      )}
      style={{ width, height }}
    />
  )
}
