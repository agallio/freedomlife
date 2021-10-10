import { createContext, useContext, useReducer } from 'react'

import { GuideDataResponse } from '@/types/api'

interface GuideInitialState {
  guideData: GuideDataResponse
  guideDate: string
  guidePassage: string
}

type GuideAction =
  | { type: 'SET_GUIDE_DATA'; data: GuideDataResponse }
  | { type: 'SET_GUIDE_DATE'; data: string }
  | { type: 'SET_GUIDE_PASSAGE'; data: string }

interface GuideContextType {
  guideState: GuideInitialState
  guideDispatch: (_: GuideAction) => void
}

const guideInitialState = {
  guideData: {},
  guideDate: '',
  guidePassage: 'kej-1',
}

const GuideContext = createContext<GuideContextType>({
  guideState: guideInitialState,
  guideDispatch: () => null,
})

const reducer = (state: GuideInitialState, action: GuideAction) => {
  switch (action.type) {
    case 'SET_GUIDE_DATA':
      return { ...state, guideData: action.data }
    case 'SET_GUIDE_DATE':
      return { ...state, guideDate: action.data }
    case 'SET_GUIDE_PASSAGE':
      return { ...state, guidePassage: action.data, guideDate: '' }

    default:
      return state
  }
}

export const GuideProvider: React.FC = ({ children }) => {
  const [guideState, guideDispatch] = useReducer(reducer, guideInitialState)

  return (
    <GuideContext.Provider value={{ guideState, guideDispatch }}>
      {children}
    </GuideContext.Provider>
  )
}

export const useGuide = (): GuideContextType => {
  const context = useContext(GuideContext)
  if (context === undefined) {
    throw new Error('useGuide must be used within a GuideProvider')
  }
  return context
}
