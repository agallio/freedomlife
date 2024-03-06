import { type ColorSchemeName } from 'react-native'
import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconColor(colorScheme: ColorSchemeName) {
  return colorScheme === 'light' ? '#064e3b' : '#fff'
}
