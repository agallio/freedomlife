import { DefaultTheme, DarkTheme, type Theme } from '@react-navigation/native'

const fonts = {
  regular: {
    fontFamily: 'inter',
  },
  medium: {
    fontFamily: 'inter-medium',
  },
  bold: {
    fontFamily: 'inter-bold',
  },
  heavy: {
    fontFamily: 'inter-bold',
  },
} as Theme['fonts']

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6ee7b7',
    background: '#f3f4f6',
    card: '#f3f4f6',
  },
  fonts,
}

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#047857',
    background: '#1f2937',
    card: '#1f2937',
  },
  fonts,
}
