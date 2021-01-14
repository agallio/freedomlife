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

interface ErrorResponse {
  message: string
}

export interface ApiResponse<Data = unknown> {
  status: number
  ok: boolean
  data: Data
  error: ErrorResponse | null
}
