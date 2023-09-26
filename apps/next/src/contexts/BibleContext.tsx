import { createContext, ReactNode, useContext, useState } from 'react'

// Types
import type { HighlightedText } from '~/types/component'

interface BibleContextState {
  openTranslate: boolean
  openPassage: boolean
  openSetting: boolean
  highlighted: boolean
  highlightedText: HighlightedText[]
  bibleVersion: string
  maintenance: boolean
}

interface BibleContextValue {
  openTranslate: boolean
  setOpenTranslate: (_: boolean) => void
  openPassage: boolean
  setOpenPassage: (_: boolean) => void
  openSetting: boolean
  setOpenSetting: (_: boolean) => void
  highlighted: boolean
  setHighlighted: (_: boolean) => void
  highlightedText: HighlightedText[]
  setHighlightedText: (_: HighlightedText[]) => void
  bibleVersion: string
  setBibleVersion: (_: string) => void
  maintenance: boolean
  setMaintenance: (_: boolean) => void
}

const BibleContext = createContext<BibleContextValue>({
  openTranslate: false,
  setOpenTranslate: () => null,
  openPassage: false,
  setOpenPassage: () => null,
  openSetting: false,
  setOpenSetting: () => null,
  highlighted: false,
  setHighlighted: () => null,
  highlightedText: [],
  setHighlightedText: () => null,
  bibleVersion: 'tb',
  setBibleVersion: () => null,
  maintenance: false,
  setMaintenance: () => null,
})

export function BibleProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [
    {
      openTranslate,
      openPassage,
      openSetting,
      highlighted,
      highlightedText,
      bibleVersion,
      maintenance,
    },
    setState,
  ] = useState<BibleContextState>({
    openTranslate: false,
    openPassage: false,
    openSetting: false,
    highlighted: false,
    highlightedText: [],
    bibleVersion: 'tb',
    maintenance: false,
  })

  const setOpenTranslate = (open: boolean) =>
    setState((prevState) => ({ ...prevState, openTranslate: open }))
  const setOpenPassage = (open: boolean) =>
    setState((prevState) => ({ ...prevState, openPassage: open }))
  const setOpenSetting = (open: boolean) =>
    setState((prevState) => ({ ...prevState, openSetting: open }))
  const setHighlighted = (highlighted: boolean) =>
    setState((prevState) => ({ ...prevState, highlighted: highlighted }))
  const setHighlightedText = (highlightedText: HighlightedText[]) =>
    setState((prevState) => ({ ...prevState, highlightedText }))
  const setBibleVersion = (bibleVersion: string) =>
    setState((prevState) => ({ ...prevState, bibleVersion }))
  const setMaintenance = (maintenance: boolean) =>
    setState((prevState) => ({ ...prevState, maintenance }))

  return (
    <BibleContext.Provider
      value={{
        openTranslate,
        setOpenTranslate,
        openPassage,
        setOpenPassage,
        openSetting,
        setOpenSetting,
        highlighted,
        setHighlighted,
        highlightedText,
        setHighlightedText,
        bibleVersion,
        setBibleVersion,
        maintenance,
        setMaintenance,
      }}
    >
      {children}
    </BibleContext.Provider>
  )
}

export function useBible() {
  const context = useContext(BibleContext)
  if (!context) {
    throw new Error('useBible must be used within a BibleProvider')
  }
  return context
}
