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
  openSaver: boolean
}

type ReadModalsWebContextType = InitialState & {
  setOpenTranslate: Dispatch<SetStateAction<boolean>>
  setOpenPassage: Dispatch<SetStateAction<boolean>>
  setOpenPassageChapter: Dispatch<SetStateAction<boolean>>
  setOpenSetting: Dispatch<SetStateAction<boolean>>
  setOpenSaver: Dispatch<SetStateAction<boolean>>
}

const initialState: InitialState = {
  openTranslate: false,
  openPassage: false,
  openPassageChapter: false,
  openSetting: false,
  openSaver: false,
}

const ReadModalsWebContext = createContext<ReadModalsWebContextType>({
  ...initialState,

  // Methods
  setOpenTranslate: () => {},
  setOpenPassage: () => {},
  setOpenPassageChapter: () => {},
  setOpenSetting: () => {},
  setOpenSaver: () => {},
})

/**
 * Web Only!
 */
export function ReadModalsWebContextProvider({ children }: PropsWithChildren) {
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
  const [openSaver, setOpenSaver] = useState<boolean>(initialState.openSaver)

  return (
    <ReadModalsWebContext.Provider
      value={{
        openTranslate,
        openPassage,
        openPassageChapter,
        openSetting,
        openSaver,

        setOpenTranslate,
        setOpenPassage,
        setOpenPassageChapter,
        setOpenSetting,
        setOpenSaver,
      }}
    >
      {children}
    </ReadModalsWebContext.Provider>
  )
}

/**
 * Web Only!
 */
export function useReadModalsWebContext() {
  const value = useContext(ReadModalsWebContext)

  if (!value) {
    console.log(
      'useReadModalsWebContext must be used within ReadModalsWebContextProvider',
    )
  }

  return value
}
