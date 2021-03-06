import { createContext, Dispatch, useContext, useReducer } from 'react'
import { ActionTypes } from '.'

interface GuideInitialState {
  guideData: {
    month?: string
    month_name?: string
    year?: string
    date?: string
    pl?: string
    pb?: string
    in?: string
    pl_name?: string
    pb_name?: string
    in_name?: string
  }
  guideDate: string
  guidePassage: string
}

const guideInitialState = {
  guideData: {},
  guideDate: '',
  guidePassage: 'kej-1',
}

const GuideState = createContext<GuideInitialState>(guideInitialState)
const GuideDispatch = createContext<Dispatch<{ type: string; data: any }>>(
  () => null
)

const reducer = (state: GuideInitialState, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_GUIDE_DATA':
      return { ...state, guideData: action.data }
    case 'SET_GUIDE_DATE':
      return { ...state, guideDate: action.data }
    case 'SET_GUIDE_PASSAGE':
      return { ...state, guidePassage: action.data, guideDate: '' }

    default:
      throw new Error(`Unkown action: ${action.type}`)
  }
}

export const GuideProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, guideInitialState)

  return (
    <GuideDispatch.Provider value={dispatch}>
      <GuideState.Provider value={state}>{children}</GuideState.Provider>
    </GuideDispatch.Provider>
  )
}

export const useGuide = (): GuideInitialState => useContext(GuideState)
export const useDispatchGuide = (): Dispatch<{ type: string; data: any }> =>
  useContext(GuideDispatch)
