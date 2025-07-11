import type { VerseData } from '../../../../../../types'

export type ReadTypographyItemProps = {
  item: VerseData
  index: number
  isSelected?: boolean
  highlightOrBookmarkData?: {
    kind: string // 'highlight' | 'bookmark'
    color: string | null
  }
  onClick: (_content: string, _verse: number) => void
}
