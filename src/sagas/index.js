import { takeEvery } from 'redux-saga/effects';
import {
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_BY_MONTH,
  FETCH_GUIDE_BY_DATE,
  FETCH_TODAY_CHAPTER,
  FETCH_CHAPTER_BY_DATE,
  FETCH_GUIDE2020_TODAY,
  FETCH_GUIDE2020_BY_MONTH,
  FETCH_GUIDE2020_BY_DATE,
  FETCH_TODAY_CHAPTER2020,
  FETCH_CHAPTER2020_BY_DATE,
  FETCH_WARTA_BY_MONTH
} from '../actions';

import {
  fetchGuideToday,
  fetchGuideByMonth,
  fetchGuideByDate,
  fetchGuide2020Today,
  fetchGuide2020ByMonth,
  fetchGuide2020ByDate
} from './guide';
import {
  fetchTodayChapter,
  fetchChapterByDate,
  fetchTodayChapter2020,
  fetchChapter2020ByDate
} from './bible';
import { fetchWartaByMonth } from './warta';

function* rootSaga() {
  yield takeEvery(FETCH_GUIDE_TODAY, fetchGuideToday);
  yield takeEvery(FETCH_GUIDE_BY_MONTH, fetchGuideByMonth);
  yield takeEvery(FETCH_GUIDE_BY_DATE, fetchGuideByDate);
  yield takeEvery(FETCH_TODAY_CHAPTER, fetchTodayChapter);
  yield takeEvery(FETCH_CHAPTER_BY_DATE, fetchChapterByDate);
  // 2020
  yield takeEvery(FETCH_GUIDE2020_TODAY, fetchGuide2020Today);
  yield takeEvery(FETCH_GUIDE2020_BY_MONTH, fetchGuide2020ByMonth);
  yield takeEvery(FETCH_GUIDE2020_BY_DATE, fetchGuide2020ByDate);
  yield takeEvery(FETCH_TODAY_CHAPTER2020, fetchTodayChapter2020);
  yield takeEvery(FETCH_CHAPTER2020_BY_DATE, fetchChapter2020ByDate);
  yield takeEvery(FETCH_WARTA_BY_MONTH, fetchWartaByMonth);
}

export default rootSaga;
