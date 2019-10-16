import {
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_BY_MONTH,
  FETCH_GUIDE_BY_DATE,
  SET_GUIDE_DATE
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
