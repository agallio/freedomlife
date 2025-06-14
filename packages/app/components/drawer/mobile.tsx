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
  isModal = true,
  size = 'base',
  maxWidth = 'full',
  title,
  backButton,
  searchInput,
  children,
  setOpen,
}: DrawerProps) {
  return (
    <VaulDrawer.Root
      fixed
      modal={isModal}
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
            'fixed bottom-0 left-0 right-0 z-[3] mt-24 flex flex-col rounded-t-[16px]',
            maxWidth === 'small' ? 'mx-auto max-w-xl' : 'max-w-full',
            size === 'base' && 'h-[96%]',
            size === 'small' && 'h-[40%]',
            size === 'saver' && 'h-[300px]',
          )}
        >
          <div
            className={cn(
              'relative flex-1 overflow-auto rounded-t-[16px] p-4',
              isModal
                ? 'bg-gray-50 shadow-none dark:bg-gray-800'
                : 'border border-gray-200 bg-gray-100 shadow-lg shadow-neutral-700 sm:shadow sm:shadow-neutral-300 dark:border-gray-700 dark:bg-[#232f3f] dark:shadow-black/50 sm:dark:shadow-black/50',
            )}
          >
            <div
              className={cn(
                'fixed left-0 right-0 top-0 z-[1] flex flex-col rounded-t-[16px]',
                isModal
                  ? 'border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                  : 'border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700',
              )}
            >
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
                    variant="navigator"
                    icon={<XMarkIcon size={20} className="dark:text-white" />}
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>

              {searchInput}
            </div>

            <div
              className={cn(
                'data-vaul-no-drag mx-auto flex max-w-xl flex-col',
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
