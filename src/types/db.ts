interface Verse {
  content: string
  type: string
  verse: number
}

export interface BibleInterface {
  book: string
  abbr: string
  chapter: string
  verses: Verse[]
}

export interface GuideInterface {
  month: string
  month_name: string
  year: string
  date: string
  pl: string
  pb: string
  in: string
  pl_name: string
  pb_name: string
  in_name: string
}
