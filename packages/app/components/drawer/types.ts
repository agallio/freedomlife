import type { PropsWithChildren, ReactNode } from 'react'

export type DrawerProps = PropsWithChildren<{
  open: boolean
  title: string
  size?: 'small' | 'base' | 'saver'
  maxWidth?: 'small' | 'full'
  isModal?: boolean
  dismissible?: boolean
  fixedHeight?: boolean
  backButton?: ReactNode
  searchInput?: ReactNode
  setOpen: (_open: boolean) => void
}>
