import axios from 'axios';
import moment from 'moment';
import { put } from 'redux-saga/effects';

import {
  FETCH_WARTA_BY_MONTH_SUCCESS,
  FETCH_WARTA_BY_MONTH_FAILURE
} from '../actions';

export function* fetchWartaByMonth() {
  try {
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    const response = yield axios.get(`/api/2020/warta`, {
      params: { month, year }
    });

    yield put({ type: FETCH_WARTA_BY_MONTH_SUCCESS, data: response.data });
  } catch (err) {
    console.log(err);
    yield put({ type: FETCH_WARTA_BY_MONTH_FAILURE });
  }
}
