import { createContext, useContext, useReducer } from 'react'

import type { HighlightedText } from '@/types/components'

interface BibleInitialState {
  openTranslate: boolean
  openPassage: boolean
  openSetting: boolean
  highlighted: boolean
  highlightedText: HighlightedText[]
  bibleVersion: string
  maintenance: boolean
}

type BibleAction =
  | { type: 'SET_OPEN_TRANSLATE'; data: boolean }
  | { type: 'SET_OPEN_PASSAGE'; data: boolean }
  | { type: 'SET_OPEN_SETTING'; data: boolean }
  | { type: 'SET_HIGHLIGHTED'; data: boolean }
  | { type: 'SET_HIGHLIGHTED_TEXT'; data: HighlightedText[] }
  | { type: 'SET_BIBLE_VERSION'; data: string }
  | { type: 'SET_MAINTENANCE'; data: boolean }

interface BibleContextType {
  bibleState: BibleInitialState
  bibleDispatch: (_: BibleAction) => void
}

const bibleInitialState: BibleInitialState = {
  openTranslate: false,
  openPassage: false,
  openSetting: false,
  highlighted: false,
  highlightedText: [],
  bibleVersion: 'tb',
  maintenance: false,
}

const BibleContext = createContext<BibleContextType>({
  bibleState: bibleInitialState,
  bibleDispatch: () => null,
})

const reducer = (state: BibleInitialState, action: BibleAction) => {
  switch (action.type) {
    case 'SET_OPEN_TRANSLATE':
      return { ...state, openTranslate: action.data }
    case 'SET_OPEN_PASSAGE':
      return { ...state, openPassage: action.data }
    case 'SET_OPEN_SETTING':
      return { ...state, openSetting: action.data }
    case 'SET_HIGHLIGHTED':
      return { ...state, highlighted: action.data }
    case 'SET_HIGHLIGHTED_TEXT':
      return { ...state, highlightedText: action.data }
    case 'SET_BIBLE_VERSION':
      return { ...state, bibleVersion: action.data }
    case 'SET_MAINTENANCE':
      return { ...state, maintenance: action.data }

    default:
      return state
  }
}

export const BibleProvider: React.FC = ({ children }) => {
  const [bibleState, bibleDispatch] = useReducer(reducer, bibleInitialState)

  return (
    <BibleContext.Provider value={{ bibleState, bibleDispatch }}>
      {children}
    </BibleContext.Provider>
  )
}

export const useBible = (): BibleContextType => {
  const context = useContext(BibleContext)
  if (context === undefined) {
    throw new Error('useBible must be used within a BibleProvider')
  }
  return context
}
