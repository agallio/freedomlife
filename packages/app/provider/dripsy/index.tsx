import { DripsyProvider, makeTheme } from 'dripsy'
import { Platform, useColorScheme } from 'react-native'

import { colors, darkColors } from './colors'

export const fontName = 'inter'

const webFont = (font: string) =>
  Platform.select({
    web: `${fontName}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    default: font,
  })

const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  customFonts: {
    [fontName]: {
      default: webFont(fontName),
      bold: webFont(`${fontName}-bold`),
      normal: webFont(fontName),
      '300': webFont(`${fontName}-light`),
      '400': webFont(fontName),
      '500': webFont(`${fontName}-medium`),
      '600': webFont(`${fontName}-semibold`),
      '700': webFont(`${fontName}-semibold`),
      '800': webFont(`${fontName}-bold`),
      '900': webFont(`${fontName}-bold`),
    },
  },
  colors,
  space: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
    '2xl': 128,
    '3xl': 256,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 17,
    lg: 18,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
  },
  fonts: {
    root: fontName,
  },
  fontWeights: {
    bold: '800',
  },
  text: {
    body: { fontSize: 'md' },
    p: {
      mt: 0,
      mb: 0,
      color: 'text',
      fontSize: 'md',
    },
  },
  shadows: {
    container: {
      shadowColor: '#03121A',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 4,
    },
    interactive: {
      shadowColor: '#03121A',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 3,
    },
    raised: {
      shadowColor: '#03121A',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 3,
    },
    float: {
      shadowColor: '#03121A',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 4,
    },
    hover: {
      shadowColor: '#03121A',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
  },
})

const themeDark = {
  ...theme,
  colors: darkColors,
}

export function Dripsy({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme()

  return (
    <DripsyProvider
      theme={colorScheme === 'dark' ? themeDark : theme}
      // this disables SSR, since react-native-web doesn't have support for it (yet)
      ssr
    >
      {children}
    </DripsyProvider>
  )
}
