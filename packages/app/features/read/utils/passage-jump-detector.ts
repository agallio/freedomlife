import { passageData } from '../../../utils/constants'

export interface JumpResult {
  bookName: string
  bookAbbr: string
  chapter: number
}

export function detectPassageJump(searchText: string): JumpResult | null {
  // Must be exactly 2 parts: abbreviation and chapter
  const parts = searchText.trim().split(' ')

  if (parts.length !== 2) return null

  const [abbr, chapterStr] = parts
  const chapter = Number(chapterStr)

  // Validate chapter is a valid number and >= 1
  if (isNaN(chapter) || chapter < 1) return null

  // Find book by abbreviation (exact match)
  const book = passageData.find((b) => b.abbr === abbr)
  if (!book) return null

  // Validate chapter is within book's range
  if (chapter > book.passage) return null

  return {
    bookName: book.name,
    bookAbbr: book.abbr,
    chapter,
  }
}
