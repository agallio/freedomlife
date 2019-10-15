import { takeEvery } from 'redux-saga/effects';
import {
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_BY_MONTH,
  FETCH_GUIDE_BY_DATE,
  FETCH_TODAY_CHAPTER,
  FETCH_CHAPTER_BY_DATE
} from '../actions';

import { fetchGuideToday, fetchGuideByMonth, fetchGuideByDate } from './guide';
import { fetchTodayChapter, fetchChapterByDate } from './bible';

function* rootSaga() {
  yield takeEvery(FETCH_GUIDE_TODAY, fetchGuideToday);
  yield takeEvery(FETCH_GUIDE_BY_MONTH, fetchGuideByMonth);
  yield takeEvery(FETCH_GUIDE_BY_DATE, fetchGuideByDate);
  yield takeEvery(FETCH_TODAY_CHAPTER, fetchTodayChapter);
  yield takeEvery(FETCH_CHAPTER_BY_DATE, fetchChapterByDate);
}

export default rootSaga;
