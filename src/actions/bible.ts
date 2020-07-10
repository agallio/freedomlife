import { FETCH_TODAY_CHAPTER, ActionTypes } from './index'

export const fetchTodayChapter = (version: string): ActionTypes => {
  return { type: FETCH_TODAY_CHAPTER, data: { version } }
}
