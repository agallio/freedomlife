import { PropsWithChildren } from 'react'

// Utils
import { cn } from '../utils/helpers'

type NavbarWebProps = PropsWithChildren<{
  active?: boolean
}>

/**
 * Web only!
 */
export default function NavbarWeb({ active, children }: NavbarWebProps) {
  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[1] h-16 border-b',
        active
          ? 'border-emerald-400 bg-emerald-300 dark:border-emerald-600 dark:bg-emerald-700'
          : 'border-gray-100 bg-white/60 dark:border-gray-700 dark:bg-gray-800/60',
      )}
      style={
        !active
          ? {
              backdropFilter: 'saturate(180%) blur(12px)',
              WebkitBackdropFilter: 'saturate(180%) blur(12px)',
            }
          : undefined
      }
    >
      <div className="mx-6 flex h-full max-w-sm items-center justify-between sm:mx-auto sm:max-w-md landscape:mx-auto">
        {children}
      </div>
    </header>
  )
}
