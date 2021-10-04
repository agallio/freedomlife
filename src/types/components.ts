import { Dispatch, RefObject, SetStateAction } from 'react'
import {
  ApiResponse,
  BibleDataResponse,
  BibleGuideDataResponse,
  GuideDataResponse,
  VerseData,
} from './api'
import { BibleList } from './utils'

// Components
export interface HighlightedText {
  verse: number
  content: string
}

export interface JumboHeaderProps {
  isNotFound?: boolean
  isHome?: boolean
  subtitle?: string
  description?: string
}

export interface HomeBoxProps {
  data: ApiResponse<GuideDataResponse> | undefined
  toBible: () => void
}

export interface GuideItemProps {
  item: GuideDataResponse
  index: number
  toBibleWithDate: (date: string) => void
}

export interface BibleNavbarProps {
  highlighted: boolean
  highlightedText: HighlightedText[]
  inGuide: boolean
  guideDate: string
  passageTitle: string
  handleExitGuide: () => void
  removeHighlight: () => void
  copyText: () => void
  handleOpenTranslate: () => void
  handleOpenPassage: () => void
  handleOpenSetting: () => void
}

export interface BibleTypographyProps {
  inGuide: boolean
  verseFontSize: string
  maintenance: boolean
  data: ApiResponse<BibleGuideDataResponse> | undefined
  bibleData: ApiResponse<BibleDataResponse> | undefined
  passageArray: VerseData[] | undefined
  highlightedText: HighlightedText[]
  getHeaderFontSize: () => void
  highlightText: (verse: number, content: string) => void
}

export interface BibleNavigatorProps {
  chevronRef?: RefObject<HTMLElement>
  data: ApiResponse<BibleGuideDataResponse> | undefined
  bibleData: ApiResponse<BibleDataResponse> | undefined
  inGuide: boolean
  passage: string
  guidePassage: string
  backPassage: () => void
  nextPassage: () => void
}

export interface BibleTranslateDialogProps {
  openTranslate: boolean
  bibleVersion: string
  handleCloseTranslate: () => void
  changeVersion: (version: string) => void
}

export interface BiblePassageDialogProps {
  openPassage: boolean
  inGuide: boolean
  passage: string
  plSpaceSplit: false | string[] | undefined
  plList: number[]
  chapterSelected: {
    name: string
    abbr: string
    passage: number
  }
  searchChapter: string
  setSearchChapter: (val: string) => void
  handleSelectChapter: (item: BibleList) => void
  setChapterSelected: Dispatch<
    SetStateAction<{
      name: string
      abbr: string
      passage: number
    }>
  >
  changePassage: (name: string) => void
  changeChapter: (val: string) => void
  handleClosePassage: () => void
  handleExitGuide: () => void
}

export interface BibleSettingDialogProps {
  openSetting: boolean
  verseFontSize: string
  getFontSizeName: string
  handleMinusFontSize: () => void
  handlePlusFontSize: () => void
  setVerseFontSize: (size: string) => void
  handleCloseSetting: () => void
}

export interface IconProps {
  className?: string
  outline?: boolean
  onClick?: () => void
}

export interface LearnPageProps {
  post: { title: string; content: string }
}
