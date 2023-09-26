import { createContext, PropsWithChildren, useContext } from 'react'
import usePersistState from 'app/utils/hooks/usePersistState'

interface ContextValue {
  verseFontSize: FontSize
  headerFontSize: 'md' | 'lg' | 'xl' | '2xl'
  verseLineHeight: number
  verseNumberFontSize: number
  verseNumberLineHeight: number
  setVerseFontSize: (_: FontSize) => void
}

export type FontSize = 'sm' | 'md' | 'lg' | 'xl'

const Context = createContext<ContextValue>({
  verseFontSize: 'md',
  headerFontSize: 'lg',
  verseLineHeight: 20,
  verseNumberFontSize: 11,
  verseNumberLineHeight: 28,
  setVerseFontSize: () => null,
})

export function ReadSettingsContext({ children }: PropsWithChildren<{}>) {
  const [verseFontSize, setVerseFontSize] = usePersistState<FontSize>(
    'verseFontSize',
    'md'
  )

  const getHeaderFontSize = () => {
    switch (verseFontSize) {
      case 'sm':
        return 'md'
      case 'md':
        return 'lg'
      case 'lg':
        return 'xl'
      case 'xl':
        return '2xl'
      default:
        return 'lg'
    }
  }

  const getVerseLineHeight = () => {
    switch (verseFontSize) {
      case 'sm':
        return 28
      case 'md':
        return 32
      case 'lg':
        return 38
      case 'xl':
        return 46
      default:
        return 32
    }
  }

  const getVerseNumberFontSize = () => {
    switch (verseFontSize) {
      case 'sm':
      case 'md':
        return 11
      case 'lg':
      case 'xl':
        return 14
      default:
        return 11
    }
  }

  const getVerseNumberLineHeight = () => {
    switch (verseFontSize) {
      case 'sm':
        return 26
      case 'md':
        return 26
      case 'lg':
        return 34
      case 'xl':
        return 40
      default:
        return 30
    }
  }

  return (
    <Context.Provider
      value={{
        verseFontSize,
        headerFontSize: getHeaderFontSize(),
        verseLineHeight: getVerseLineHeight(),
        verseNumberFontSize: getVerseNumberFontSize(),
        verseNumberLineHeight: getVerseNumberLineHeight(),
        setVerseFontSize,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useReadSettingsContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error(
      'useReadSettingsContext must be used within a ReadSettingsContext'
    )
  }
  return context
}
