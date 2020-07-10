import { FETCH_GUIDE_TODAY, FETCH_GUIDE_BY_MONTH, ActionTypes } from './index'

export const fetchGuideToday = (): ActionTypes => {
  return { type: FETCH_GUIDE_TODAY }
}

export const fetchGuideByMonth = (month: string, year: string): ActionTypes => {
  return { type: FETCH_GUIDE_BY_MONTH, data: { month, year } }
}
