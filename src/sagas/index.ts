import { takeEvery } from 'redux-saga/effects'

import {
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_BY_MONTH,
  FETCH_TODAY_CHAPTER,
} from '../actions'
import { fetchGuideToday, fetchGuideByMonth } from './guide'
import { fetchTodayChapter } from './bible'

function* rootSaga() {
  yield takeEvery(FETCH_GUIDE_TODAY, fetchGuideToday)
  yield takeEvery(FETCH_GUIDE_BY_MONTH, fetchGuideByMonth)
  yield takeEvery(FETCH_TODAY_CHAPTER, fetchTodayChapter)
}

export default rootSaga
