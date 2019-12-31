import {
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_BY_MONTH,
  FETCH_GUIDE_BY_DATE,
  SET_GUIDE_DATE,
  // 2020
  FETCH_GUIDE2020_TODAY,
  FETCH_GUIDE2020_BY_MONTH,
  FETCH_GUIDE2020_BY_DATE
} from './index';

export const fetchGuideToday = () => {
  return { type: FETCH_GUIDE_TODAY };
};

export const fetchGuideByMonth = (month, year) => {
  return { type: FETCH_GUIDE_BY_MONTH, month, year };
};

export const fetchGuideByDate = date => {
  return { type: FETCH_GUIDE_BY_DATE, date };
};

export const setGuideDate = date => {
  return { type: SET_GUIDE_DATE, date };
};

// 2020
export const fetchGuide2020Today = () => {
  return { type: FETCH_GUIDE2020_TODAY };
};

export const fetchGuide2020ByMonth = (month, year) => {
  return { type: FETCH_GUIDE2020_BY_MONTH, month, year };
};

export const fetchGuide2020ByDate = date => {
  return { type: FETCH_GUIDE2020_BY_DATE, date };
};
