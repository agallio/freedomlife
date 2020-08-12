import axios from 'axios'
import { put } from 'redux-saga/effects'

import {
  FETCH_TODAY_CHAPTER_SUCCESS,
  FETCH_TODAY_CHAPTER_FAILURE,
  FETCH_CHAPTER_BY_DATE_SUCCESS,
  FETCH_CHAPTER_BY_DATE_FAILURE,
} from '../actions'

interface TodayChapter {
  type: string
  data: {
    version: string
  }
}

interface ChapterByDate {
  type: string
  data: { version: string; date: string }
}

export function* fetchTodayChapter({ data }: TodayChapter) {
  const { version } = data

  try {
    const response = yield axios.get(
      `/api/bible/today?version=${version || 'tb'}`
    )

    yield put({ type: FETCH_TODAY_CHAPTER_SUCCESS, data: response.data })
  } catch (err) {
    console.log(err)
    yield put({ type: FETCH_TODAY_CHAPTER_FAILURE })
  }
}

export function* fetchChapterByDate({ data }: ChapterByDate) {
  const { version, date } = data

  try {
    const response = yield axios.get(
      `/api/bible/${date}?version=${version || 'tb'}`
    )

    yield put({ type: FETCH_CHAPTER_BY_DATE_SUCCESS, data: response.data })
  } catch (err) {
    console.log(err)
    yield put({ type: FETCH_CHAPTER_BY_DATE_FAILURE })
  }
}
