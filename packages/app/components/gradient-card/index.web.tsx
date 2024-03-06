import { View } from 'react-native'

// Utils
import { cn } from '../../utils/helpers'

// Types
import type { CardProps } from '../card'

type GradientCardProps = CardProps & {
  variants: 'passage' | 'new-user'
  className?: string
}

const gradientColors = {
  passage:
    'bg-[linear-gradient(45deg,#34d399_0%,#a7f3d0_100%)] dark:bg-[linear-gradient(45deg,#0a845c_0%,#0098b7_100%)]',
  'new-user': 'bg-[linear-gradient(90deg,#a855f7,#6366f1,#3b82f6)]',
}

export default function GradientCard({
  title,
  footer,
  variants,
  className,
  children,
}: GradientCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center rounded-lg',
        gradientColors[variants],
        className,
      )}
    >
      {title && (
        <View className="flex w-full flex-col rounded-t-lg bg-white/20 dark:bg-black/10">
          {title}
        </View>
      )}

      {children}

      {footer && (
        <View className="flex w-full flex-col rounded-b-lg bg-white/20 dark:bg-black/10">
          {footer}
        </View>
      )}
    </div>
  )
}
