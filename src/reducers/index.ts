import { combineReducers } from 'redux'

import bible from './bible'
import guide from './guide'

// Bible Types & Interfaces
export type ContentData = {
  content: string
  type: string
  verse: number
}

type Content = {
  version: string
  book: string
  chapter: number
  passagePlace: string
  data: ContentData[]
}

type Chapters = {
  passage: string[]
  pl: Content[]
  pb: Content[]
  alt: Content[]
}

interface BibleState {
  chapters: Chapters
  isFetching: boolean
  isError: boolean
}

// Guide Types & Interfaces
export type Guide = {
  _id: string
  month_name: string
  month: string
  year: string
  date: string
  pl: string
  pb: string
  pl_name: string
  pb_name: string
  alt: string
  alt_name: string
}

interface GuideState {
  guideToday: Guide
  guideByMonth: Guide[]
  isFetching: boolean
  isError: boolean
}

export interface RootState {
  bible: BibleState
  guide: GuideState
}

export default combineReducers({ bible, guide })
