// Icon Components
import FreedomlifeIconLight from './light'
import FreedomlifeIconDark from './dark'

// Utils
import { cn } from '../../../utils/helpers'

// Types
import type { IconProps } from '../../../types'

export default function FreedomlifeIcon(props: IconProps) {
  return (
    <>
      <FreedomlifeIconLight
        {...props}
        className={cn('dark:hidden', props.className)}
      />
      <FreedomlifeIconDark
        {...props}
        className={cn('hidden dark:block', props.className)}
      />
    </>
  )
}
