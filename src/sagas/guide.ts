import axios from 'axios'
import { put } from 'redux-saga/effects'

import {
  FETCH_GUIDE_TODAY_SUCCESS,
  FETCH_GUIDE_TODAY_FAILURE,
  FETCH_GUIDE_BY_MONTH_SUCCESS,
  FETCH_GUIDE_BY_MONTH_FAILURE,
  FETCH_GUIDE_BY_DATE_SUCCESS,
  FETCH_GUIDE_BY_DATE_FAILURE,
} from '../actions'

interface ByMonth {
  type: string
  data: { month: string }
}

interface ByDate {
  type: string
  data: { date: string }
}

export function* fetchGuideToday() {
  try {
    const response = yield axios.get(`/api/guide/today`)

    yield put({ type: FETCH_GUIDE_TODAY_SUCCESS, data: response.data })
  } catch (err) {
    console.log(err)
    yield put({ type: FETCH_GUIDE_TODAY_FAILURE })
  }
}

export function* fetchGuideByMonth({ data }: ByMonth) {
  const { month } = data

  try {
    const response = yield axios.get(`/api/guide/month/${month}`)

    yield put({ type: FETCH_GUIDE_BY_MONTH_SUCCESS, data: response.data })
  } catch (err) {
    console.log(err)
    yield put({ type: FETCH_GUIDE_BY_MONTH_FAILURE })
  }
}

export function* fetchGuideByDate({ data }: ByDate) {
  const { date } = data

  try {
    const response = yield axios.get(`/api/guide/${date}`)

    yield put({ type: FETCH_GUIDE_BY_DATE_SUCCESS, data: response.data })
  } catch (err) {
    console.log(err)
    yield put({ type: FETCH_GUIDE_BY_DATE_FAILURE })
  }
}
