import {
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_TODAY_SUCCESS,
  FETCH_GUIDE_TODAY_FAILURE,
  FETCH_GUIDE_BY_MONTH,
  FETCH_GUIDE_BY_MONTH_SUCCESS,
  FETCH_GUIDE_BY_MONTH_FAILURE,
  ActionTypes,
} from '../actions'

const initialState = {
  guideToday: {
    date: '',
    pl_name: '',
    pb_name: '',
    alt_name: '',
  },
  guideByMonth: [],

  isFetching: false,
  isError: false,
}

const guideReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    // Fetching
    case FETCH_GUIDE_TODAY:
    case FETCH_GUIDE_BY_MONTH:
      return { ...state, isFetching: true, isError: false }

    // Failure
    case FETCH_GUIDE_BY_MONTH_FAILURE:
    case FETCH_GUIDE_TODAY_FAILURE:
      return { ...state, isFetching: false, isError: true }

    // Success
    case FETCH_GUIDE_TODAY_SUCCESS:
      return {
        ...state,
        guideToday: { ...action.data },
        guideByDate: { ...action.data },
        isFetching: false,
        isError: false,
      }
    case FETCH_GUIDE_BY_MONTH_SUCCESS:
      return {
        ...state,
        guideByMonth: [...action.data],
        isFetching: false,
        isError: false,
      }

    default:
      return state
  }
}

export default guideReducer
