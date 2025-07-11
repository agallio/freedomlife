import { type ColorSchemeName } from 'react-native'
import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { passageData } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconColor(colorScheme: ColorSchemeName) {
  return colorScheme === 'light' ? '#064e3b' : '#fff'
}

export function parseCurrentPassage(passage: string) {
  // Example passage format: "Matthew 1:1" or "1 John 2:3"
  const passageParts = passage.split(' ')
  const lastIndex = passageParts.length - 1
  const [chapter] = passageParts[lastIndex].split(':')

  // Get book name (handling both single and multi-word book names)
  const book =
    passageParts.length > 2
      ? passageParts.slice(0, -1).join(' ')
      : passageParts[0]

  const abbr = passageData.find((item) => item.name === book)?.abbr

  if (!abbr) {
    return { status: 'error', data: null, error: 'Book not found' }
  }

  return {
    status: 'success',
    data: {
      abbr,
      book,
      chapter,
    },
    error: null,
  }
}

export function parseCurrentPassageAbbr(abbr: string) {
  // Example abbr format: "kej-1:1" or "mat-2"
  const abbrParts = abbr.split('-')
  const lastIndex = abbrParts.length - 1
  const [chapter] = abbrParts[lastIndex].split(':')

  // Get book name (handling both single and multi-word book names)
  const book = passageData.find((item) => item.abbr === abbrParts[0])?.name

  if (!book) {
    return { status: 'error', data: null, error: 'Book not found' }
  }

  return {
    status: 'success',
    data: {
      abbr,
      book,
      chapter,
    },
    error: null,
  }
}
