import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'

type InitialState = {
  openGuideMonth: boolean
}

type GuideModalsContextType = InitialState & {
  setOpenGuideMonth: Dispatch<SetStateAction<boolean>>
}

const initialState: InitialState = {
  openGuideMonth: false,
}

const GuideModalsContext = createContext<GuideModalsContextType>({
  ...initialState,
  setOpenGuideMonth: () => {},
})

/**
 * Web Only!
 */
export function GuideModalsContextProvider({ children }: PropsWithChildren) {
  const [openGuideMonth, setOpenGuideMonth] = useState<boolean>(
    initialState.openGuideMonth,
  )

  return (
    <GuideModalsContext.Provider
      value={{
        openGuideMonth,
        setOpenGuideMonth,
      }}
    >
      {children}
    </GuideModalsContext.Provider>
  )
}

/**
 * Web Only!
 */
export function useGuideModalsContext() {
  const value = useContext(GuideModalsContext)

  if (!value) {
    throw new Error(
      'useGuideModalsContext must be used within GuideModalsContextProvider',
    )
  }

  return value
}
