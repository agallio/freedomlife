import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'

type ReadPassageChapterContextType = {
  searchText: string
  dialogSelectedPassage: string
  setSearchText: Dispatch<SetStateAction<string>>
  setDialogSelectedPassage: Dispatch<SetStateAction<string>>
}

const ReadPassageChapterContext = createContext<ReadPassageChapterContextType>({
  searchText: '',
  dialogSelectedPassage: '',
  setSearchText: () => {},
  setDialogSelectedPassage: () => {},
})

export function ReadPassageChapterContextProvider({
  children,
}: PropsWithChildren) {
  const [searchText, setSearchText] = useState('')
  const [dialogSelectedPassage, setDialogSelectedPassage] = useState('')

  return (
    <ReadPassageChapterContext.Provider
      value={{
        searchText,
        dialogSelectedPassage,
        setSearchText,
        setDialogSelectedPassage,
      }}
    >
      {children}
    </ReadPassageChapterContext.Provider>
  )
}

export function useReadPassageChapterContext() {
  const value = useContext(ReadPassageChapterContext)

  if (!value) {
    throw new Error(
      'useReadPassageChapterContext must be used within ReadPassageChapterContextProvider',
    )
  }

  return value
}
