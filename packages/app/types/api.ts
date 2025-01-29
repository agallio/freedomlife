// API
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
  guide_bible_data?: {
    title: string
    subtitle: string
    abbr: string
    value: string
  }[]
  available_bible_translations?: string[]
}

export interface VerseData {
  content: string
  type: string
  verse: number
}

export interface ChaptersData {
  version: string
  book: string
  chapter: string
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
  name: string
  enabled: boolean
  context: any
}

export interface FeatureFlagClientData {
  [key: string]: {
    data?: FlagDataResponse
    isLoading: boolean
  }
}
