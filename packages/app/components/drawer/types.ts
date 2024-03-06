import type {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react'

export type DrawerProps = PropsWithChildren<{
  open: boolean
  title: string
  size?: 'small' | 'base'
  dismissible?: boolean
  fixedHeight?: boolean
  backButton?: ReactNode
  searchInput?: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
}>
