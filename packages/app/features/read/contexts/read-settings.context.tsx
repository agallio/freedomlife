import { PropsWithChildren, createContext, useContext, useMemo } from 'react'
import { Platform, useWindowDimensions } from 'react-native'

// Utils
import usePersistedState from '../../../utils/hooks/use-persisted-state'

export type ReadSettingsFontSizeType = 'sm' | 'md' | 'lg' | 'xl'

type ReadSettingsContextType = {
  verseFontSize: string | number
  headerFontSize: string | number
  nativeVerseNumberFontSize: number
  nativeVerseNumberLineHeight: number
  rawVerseFontSize: ReadSettingsFontSizeType
  setVerseFontSize: (_: ReadSettingsFontSizeType) => void
}

const ReadSettingsContext = createContext<ReadSettingsContextType>({
  verseFontSize: '',
  headerFontSize: '',
  nativeVerseNumberFontSize: 0,
  nativeVerseNumberLineHeight: 0,
  rawVerseFontSize: 'md',
  setVerseFontSize: () => {},
})

// Always use complete class name to use it dynamically.
// See: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
const verseFontSizeWeb = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const headerFontSizeWeb = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
}

export function ReadSettingsContextProvider({ children }: PropsWithChildren) {
  const { fontScale } = useWindowDimensions()

  // States
  const [persistedVerseFontSize, setPersistedVerseFontSize] =
    usePersistedState<ReadSettingsFontSizeType>('verseFontSize', 'md')

  // Memoized Values
  const nativeVerseFontSize = useMemo(() => {
    switch (persistedVerseFontSize) {
      case 'sm':
        return 14 * fontScale
      case 'md':
        return 17 * fontScale
      case 'lg':
        return 19
      case 'xl':
        return 21
      default:
        return 17 * fontScale
    }
  }, [persistedVerseFontSize, fontScale])

  const nativeHeaderFontSize = useMemo(() => {
    switch (persistedVerseFontSize) {
      case 'sm':
        return 18 * fontScale
      case 'md':
        return 20 * fontScale
      case 'lg':
        return 22 * fontScale
      case 'xl':
        return 25 * fontScale
      default:
        return 18 * fontScale
    }
  }, [persistedVerseFontSize, fontScale])

  const nativeVerseNumberFontSize = useMemo(() => {
    switch (persistedVerseFontSize) {
      case 'sm':
      case 'md':
        return 11
      case 'lg':
      case 'xl':
        return 14
      default:
        return 11
    }
  }, [persistedVerseFontSize])

  const nativeVerseNumberLineHeight = useMemo(() => {
    switch (persistedVerseFontSize) {
      case 'sm':
        return 20
      case 'md':
        return 22
      case 'lg':
        return 27
      case 'xl':
        return 28
      default:
        return 20
    }
  }, [persistedVerseFontSize])

  // Constants
  const verseFontSize =
    Platform.OS === 'web'
      ? verseFontSizeWeb[persistedVerseFontSize]
      : nativeVerseFontSize

  const headerFontSize =
    Platform.OS === 'web'
      ? headerFontSizeWeb[persistedVerseFontSize]
      : nativeHeaderFontSize

  return (
    <ReadSettingsContext.Provider
      value={{
        verseFontSize,
        headerFontSize,
        nativeVerseNumberFontSize,
        nativeVerseNumberLineHeight,
        rawVerseFontSize: persistedVerseFontSize,
        setVerseFontSize: setPersistedVerseFontSize,
      }}
    >
      {children}
    </ReadSettingsContext.Provider>
  )
}

export function useReadSettingsContext() {
  const value = useContext(ReadSettingsContext)

  if (!value) {
    throw new Error(
      'useReadSettingsContext must be used within ReadSettingsContextProvider',
    )
  }

  return value
}
