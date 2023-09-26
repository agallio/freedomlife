export interface SupabaseBibles {
  id: string
  abbr: string
  book: string
  chapter: string
  version: string
  verses: VerseData[]
}

export interface SupabaseGuides {
  id: string
  month: string
  year: string
  date: string
  pl: string
  pb: string
  in: string
  pl_name: string
  pb_name: string
  in_name: string
}

export interface SupabaseFeatureFlag {
  name: string
  context: any
  enable: boolean
}

// API
export interface GuideBibleData {
  abbr: string
  title: string
  subtitle: string
  value: string
}

export interface GuideDataResponse {
  month_name?: string
  month?: string
  year?: string
  date?: string
  pl?: string
  pb?: string
  in?: string
  pl_name?: string
  pb_name?: string
  in_name?: string
  guide_bible_data?: GuideBibleData[]
}

export interface VerseData {
  content: string
  type: string
  verse: number
}

interface ChaptersData {
  version: string
  book: string
  chapter: number
  passagePlace: string
  data: VerseData[]
}

export interface BibleGuideDataResponse {
  passage: string[]
  pl: ChaptersData[]
  pb: ChaptersData[]
  in: ChaptersData[]
}

export interface BibleDataResponse {
  version: string
  book: string
  chapter: number
  data: VerseData[]
}

export interface FlagDataResponse {
  enable: boolean
  context: any
}
