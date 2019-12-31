import axios from 'axios';
import { put } from 'redux-saga/effects';

import {
  FETCH_TODAY_CHAPTER_SUCCESS,
  FETCH_TODAY_CHAPTER_FAILURE,
  FETCH_CHAPTER_BY_DATE_SUCCESS,
  FETCH_CHAPTER_BY_DATE_FAILURE,
  // 2020
  FETCH_TODAY_CHAPTER2020_SUCCESS,
  FETCH_TODAY_CHAPTER2020_FAILURE,
  FETCH_CHAPTER2020_BY_DATE_SUCCESS,
  FETCH_CHAPTER2020_BY_DATE_FAILURE
} from '../actions';

export function* fetchTodayChapter() {
  try {
    const response = yield axios.get(`/api/bible/today`);

    yield put({ type: FETCH_TODAY_CHAPTER_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_TODAY_CHAPTER_FAILURE });
  }
}

export function* fetchChapterByDate({ date }) {
  try {
    const response = yield axios.post(`/api/bible/${date}/`);

    yield put({ type: FETCH_CHAPTER_BY_DATE_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_CHAPTER_BY_DATE_FAILURE });
  }
}

// 2020
export function* fetchTodayChapter2020({ version }) {
  try {
    const response = yield axios.get(
      `/api/2020/bible/today?version=${version || 'tb'}`
    );

    yield put({ type: FETCH_TODAY_CHAPTER2020_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_TODAY_CHAPTER2020_FAILURE });
  }
}

export function* fetchChapter2020ByDate({ date }) {
  try {
    const response = yield axios.post(`/api/2020/bible/${date}/`);

    yield put({ type: FETCH_CHAPTER2020_BY_DATE_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_CHAPTER2020_BY_DATE_FAILURE });
  }
}
