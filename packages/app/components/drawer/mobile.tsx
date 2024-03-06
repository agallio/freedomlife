import { Drawer as VaulDrawer } from 'vaul'
import { XMarkIcon } from 'react-native-heroicons/solid'

// Components
import { IconButton } from '../button'
import { Header } from '../text'

// Utils
import { cn } from '../../utils/helpers'

// Types
import type { DrawerProps } from './types'

export default function MobileDrawer({
  open,
  dismissible = true,
  size = 'base',
  title,
  backButton,
  searchInput,
  children,
  setOpen,
}: DrawerProps) {
  return (
    <VaulDrawer.Root
      fixed
      dismissible={dismissible}
      open={open}
      onOpenChange={(open) => {
        if (dismissible) {
          setOpen(open)
        }
      }}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 z-[2] bg-black/40" />
        <VaulDrawer.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-[3] mt-24 flex flex-col rounded-t-[10px]',
            size === 'base' ? 'h-[96%]' : 'h-[40%]',
          )}
        >
          <div className="relative flex-1 overflow-auto rounded-t-[10px] bg-gray-50 p-4 dark:bg-gray-800">
            <div className="fixed left-0 right-0 top-0 z-[1] flex flex-col rounded-t-[10px] border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex-col gap-4 p-4">
                <div
                  className={cn(
                    'relative flex flex-row items-center',
                    backButton ? 'justify-between' : 'justify-end',
                  )}
                >
                  {backButton}
                  <VaulDrawer.Title
                    asChild
                    className="absolute left-1/2 top-1/2 w-[200px] -translate-x-1/2 -translate-y-1/2"
                  >
                    <Header className="text-center">{title}</Header>
                  </VaulDrawer.Title>
                  <IconButton
                    ariaLabel="Tombol untuk menutup dialog"
                    size="sm"
                    icon={<XMarkIcon size={20} className="dark:text-white" />}
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>

              {searchInput}
            </div>

            <div
              className={cn(
                'data-vaul-no-drag mx-auto flex max-w-md flex-col',
                searchInput ? 'pt-32' : 'pt-[4.25rem]',
              )}
            >
              {children}
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  )
}
