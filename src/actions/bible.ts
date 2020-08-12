import {
  ActionTypes,
  FETCH_TODAY_CHAPTER,
  FETCH_CHAPTER_BY_DATE,
} from './index'

export const fetchTodayChapter = (version: string): ActionTypes => {
  return { type: FETCH_TODAY_CHAPTER, data: { version } }
}

export const fetchChapterByDate = (
  version: string,
  date: string
): ActionTypes => {
  return { type: FETCH_CHAPTER_BY_DATE, data: { version, date } }
}
