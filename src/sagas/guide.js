import axios from 'axios';
// import moment from 'moment';
import { put } from 'redux-saga/effects';

import {
  FETCH_GUIDE_TODAY_SUCCESS,
  FETCH_GUIDE_TODAY_FAILURE,
  FETCH_GUIDE_BY_MONTH_SUCCESS,
  FETCH_GUIDE_BY_MONTH_FAILURE,
  FETCH_GUIDE_BY_DATE_SUCCESS,
  FETCH_GUIDE_BY_DATE_FAILURE,
  // 2020
  FETCH_GUIDE2020_TODAY_SUCCESS,
  FETCH_GUIDE2020_TODAY_FAILURE,
  FETCH_GUIDE2020_BY_MONTH_SUCCESS,
  FETCH_GUIDE2020_BY_MONTH_FAILURE,
  FETCH_GUIDE2020_BY_DATE_SUCCESS,
  FETCH_GUIDE2020_BY_DATE_FAILURE
} from '../actions';

export function* fetchGuideToday() {
  try {
    const response = yield axios.get(`/api/guide/today`);

    yield put({ type: FETCH_GUIDE_TODAY_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_GUIDE_TODAY_FAILURE });
  }
}

export function* fetchGuideByMonth({ month, year }) {
  try {
    const response = yield axios.get(`/api/guide/${month}/${year}`);

    yield put({ type: FETCH_GUIDE_BY_MONTH_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_GUIDE_BY_MONTH_FAILURE });
  }
}

export function* fetchGuideByDate({ date }) {
  try {
    const response = yield axios.get(`/api/guide/date/${date}`);

    yield put({ type: FETCH_GUIDE_BY_DATE_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_GUIDE_BY_DATE_FAILURE });
  }
}

// 2020
export function* fetchGuide2020Today() {
  try {
    const response = yield axios.get(`/api/2020/guide/today`);

    yield put({ type: FETCH_GUIDE2020_TODAY_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_GUIDE2020_TODAY_FAILURE });
  }
}

export function* fetchGuide2020ByMonth({ month, year }) {
  try {
    const response = yield axios.get(`/api/2020/guide/${month}/${year}`);

    yield put({ type: FETCH_GUIDE2020_BY_MONTH_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_GUIDE2020_BY_MONTH_FAILURE });
  }
}

export function* fetchGuide2020ByDate({ date }) {
  try {
    const response = yield axios.get(`/api/2020/guide/date/${date}`);

    yield put({ type: FETCH_GUIDE2020_BY_DATE_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_GUIDE2020_BY_DATE_FAILURE });
  }
}
