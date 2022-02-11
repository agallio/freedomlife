import { RefObject } from 'react'
import {
  BibleDataResponse,
  BibleGuideDataResponse,
  GuideDataResponse,
} from './api'

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
  data: GuideDataResponse | undefined
  isLoading: boolean
  isError?: boolean
  isGuideError?: boolean
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
  bibleVersion: string
  guideDate?: string
  passageTitle: () => string | undefined
  handleExitGuide?: () => void
  removeHighlight: () => void
  copyText: () => void
  handleOpenTranslate: () => void
  handleOpenPassage: () => void
  handleOpenSetting: () => void
}

export interface BibleTypographyProps {
  bibleTypographyRef: RefObject<HTMLDivElement>
  inGuide: boolean
  passage?: string
  maintenance: boolean
  verseFontSize: string
  highlightedText: HighlightedText[]
  isGuideByDateLoading?: boolean
  isBibleByDateLoading?: boolean
  isBibleByPassageLoading?: boolean
  bibleByDateData?: BibleGuideDataResponse
  bibleByPassageData?: BibleDataResponse
  highlightText: (verse: number, content: string) => void
}

export interface BibleNavigatorProps {
  chevronRef?: RefObject<HTMLElement>
  inGuide: boolean
  passage?: string
  biblePassage?: string
  isBibleByDateLoading?: boolean
  isBibleByPassageLoading?: boolean
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
  passage?: string
  plSpaceSplit?: false | string[] | undefined
  plList?: number[]
  changePassage?: (name: string) => void
  changeChapter?: (val: string) => void
  handleClosePassage: () => void
  handleExitGuide?: () => void
}

export interface BibleSettingDialogProps {
  openSetting: boolean
  verseFontSize: string
  setVerseFontSize: (size: string) => void
  handleCloseSetting: () => void
}

export interface IconProps {
  className?: string
  outline?: boolean
  onClick?: () => void
  theme?: string
}

export interface LearnPageProps {
  post: { title: string; content: string }
}
