import {
  ActionTypes,
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_BY_MONTH,
  FETCH_GUIDE_BY_DATE,
  // Setter
  SET_GUIDE_DATE,
} from './index'

export const fetchGuideToday = (): ActionTypes => {
  return { type: FETCH_GUIDE_TODAY }
}

export const fetchGuideByMonth = (month: string): ActionTypes => {
  return { type: FETCH_GUIDE_BY_MONTH, data: { month } }
}

export const fetchGuideByDate = (date: string): ActionTypes => {
  return { type: FETCH_GUIDE_BY_DATE, data: { date } }
}

// Setter
export const setGuideDate = (date: string): ActionTypes => {
  return { type: SET_GUIDE_DATE, data: { date } }
}
