import axios from 'axios'
import { put } from 'redux-saga/effects'

import {
  FETCH_TODAY_CHAPTER_SUCCESS,
  FETCH_TODAY_CHAPTER_FAILURE,
} from '../actions'

interface TodayChapter {
  type: string
  data: {
    version: string
  }
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
