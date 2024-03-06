import * as RadixDialog from '@radix-ui/react-dialog'
import { XMarkIcon } from 'react-native-heroicons/solid'

// Components
import { Header } from '../text'
import { IconButton } from '../button'

// Utils
import { cn } from '../../utils/helpers'

// Types
import type { DrawerProps } from './types'

export default function Dialog({
  open,
  title,
  dismissible = true,
  fixedHeight = false,
  backButton,
  searchInput,
  children,
  setOpen,
}: DrawerProps) {
  return (
    <RadixDialog.Root
      open={open}
      onOpenChange={(open) => {
        if (dismissible) {
          setOpen(open)
        }
      }}
    >
      <RadixDialog.Portal>
        <RadixDialog.Overlay id="dialog-overlay" />
        <RadixDialog.Content id="dialog-content">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div
              className={cn(
                'relative flex flex-row items-center p-4',
                backButton ? 'justify-between' : 'justify-end',
              )}
            >
              {backButton}
              <RadixDialog.Title
                asChild
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Header>{title}</Header>
              </RadixDialog.Title>
              <IconButton
                ariaLabel="Tombol untuk menutup dialog"
                size="sm"
                icon={<XMarkIcon size={20} className="dark:text-white" />}
                onClick={() => setOpen(false)}
              />
            </div>

            {searchInput}
          </div>

          <div
            className={cn(
              'scrollbar-thin max-h-[500px] overflow-auto p-4',
              fixedHeight ? 'min-h-[500px]' : undefined,
            )}
          >
            {children}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
