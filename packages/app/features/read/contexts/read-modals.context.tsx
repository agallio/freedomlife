import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'

type InitialState = {
  openTranslate: boolean
  openPassage: boolean
  openPassageChapter: boolean
  openSetting: boolean
}

type ReadModalsContextType = InitialState & {
  setOpenTranslate: Dispatch<SetStateAction<boolean>>
  setOpenPassage: Dispatch<SetStateAction<boolean>>
  setOpenPassageChapter: Dispatch<SetStateAction<boolean>>
  setOpenSetting: Dispatch<SetStateAction<boolean>>
}

const initialState: InitialState = {
  openTranslate: false,
  openPassage: false,
  openPassageChapter: false,
  openSetting: false,
}

const ReadModalsContext = createContext<ReadModalsContextType>({
  ...initialState,

  // Methods
  setOpenTranslate: () => {},
  setOpenPassage: () => {},
  setOpenPassageChapter: () => {},
  setOpenSetting: () => {},
})

/**
 * Web Only!
 */
export function ReadModalsContextProvider({ children }: PropsWithChildren) {
  const [openTranslate, setOpenTranslate] = useState<boolean>(
    initialState.openTranslate,
  )
  const [openPassage, setOpenPassage] = useState<boolean>(
    initialState.openPassage,
  )
  const [openPassageChapter, setOpenPassageChapter] = useState<boolean>(
    initialState.openPassageChapter,
  )
  const [openSetting, setOpenSetting] = useState<boolean>(
    initialState.openSetting,
  )

  return (
    <ReadModalsContext.Provider
      value={{
        openTranslate,
        openPassage,
        openPassageChapter,
        openSetting,

        setOpenTranslate,
        setOpenPassage,
        setOpenPassageChapter,
        setOpenSetting,
      }}
    >
      {children}
    </ReadModalsContext.Provider>
  )
}

/**
 * Web Only!
 */
export function useReadModalsContext() {
  const value = useContext(ReadModalsContext)

  if (!value) {
    throw new Error(
      'useReadModalsContext must be used within ReadModalsContextProvider',
    )
  }

  return value
}
