import { AxiosError, AxiosResponse } from 'axios'

// Components
export interface HighlightedText {
  verse: number
  content: string
}

export interface BibleAppBarProps {
  data: ApiResponse<BibleDataResponse> | undefined
  appBarTitle: string
  bibleVersion: string
  highlighted: boolean
  highlightedText: HighlightedText[]
  children?: React.ReactElement
  setHighlighted: React.Dispatch<React.SetStateAction<boolean>>
  setHighlightedText: React.Dispatch<React.SetStateAction<HighlightedText[]>>
  goBack: () => void
  openTranslate: () => void
  window?: () => Window
}

export interface BibleTypographyProps {
  data: ApiResponse<BibleDataResponse> | undefined
  passageArray: VerseData[]
  highlightedText: HighlightedText[]
  setHighlighted: React.Dispatch<React.SetStateAction<boolean>>
  setHighlightedText: React.Dispatch<React.SetStateAction<HighlightedText[]>>
}

export interface BibleBottomBarProps {
  data: ApiResponse<BibleDataResponse> | undefined
  passage: string
  altList: number[]
  backPassage: () => void
  nextPassage: () => void
  openPassageModal: () => void
}

export interface BiblePassageDialogProps {
  passageModal: boolean
  plSpaceSplit: string[]
  altSpaceSplit: string[]
  plList: number[]
  altList: number[]
  changePassage: (name: string, code: string) => void
  closePassageModal: () => void
}

export interface BibleVersionDialogProps {
  versionModal: boolean
  changeVersion: (version: string) => void
  closeVersionModal: () => void
}

export interface GuideListProps {
  data: ApiResponse<GuideDataResponse[]> | undefined
}

export interface GuideItemProps {
  item: GuideDataResponse
  index: number
}

export interface GuideLoadingProps {
  item: number
}

// API
export type GuideDataResponse = {
  month_name?: string
  month?: string
  year?: string
  date?: string
  pl?: string
  pb?: string
  alt?: string
  pl_name?: string
  pb_name?: string
  alt_name?: string
}

export type VerseData = {
  content: string
  type: string
  verse: number
}

type ChaptersData = {
  version: string
  book: string
  chapter: number
  passagePlace: string
  data: VerseData[]
}

export type BibleDataResponse = {
  passage: string[]
  pl: ChaptersData[]
  pb: ChaptersData[]
  alt: ChaptersData[]
}

type ErrorResponse = {
  message: string
}

export type ApiResponse<Data = unknown> = {
  status: number
  ok: boolean
  data: Data
  error: ErrorResponse | null
}

// Hooks
export interface FetchedGuideHooks {
  data: ApiResponse<GuideDataResponse> | undefined
  error: AxiosError<unknown> | undefined
  isValidating: boolean
  response: AxiosResponse<ApiResponse<GuideDataResponse>> | undefined
  revalidate: () => Promise<boolean>
}
