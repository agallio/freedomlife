import {
  ActionTypes,
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_TODAY_SUCCESS,
  FETCH_GUIDE_TODAY_FAILURE,
  FETCH_GUIDE_BY_MONTH,
  FETCH_GUIDE_BY_MONTH_SUCCESS,
  FETCH_GUIDE_BY_MONTH_FAILURE,
  FETCH_GUIDE_BY_DATE,
  FETCH_GUIDE_BY_DATE_SUCCESS,
  FETCH_GUIDE_BY_DATE_FAILURE,
  // Setter
  SET_GUIDE_DATE,
} from '../actions'

const initialState = {
  guideData: {
    date: '',
    pl_name: '',
    pb_name: '',
    alt_name: '',
  },
  guideByMonth: [],
  guideDate: '',

  isFetching: false,
  isError: false,
}

const guideReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    // Fetching
    case FETCH_GUIDE_TODAY:
    case FETCH_GUIDE_BY_MONTH:
    case FETCH_GUIDE_BY_DATE:
      return { ...state, isFetching: true, isError: false }

    // Failure
    case FETCH_GUIDE_TODAY_FAILURE:
    case FETCH_GUIDE_BY_MONTH_FAILURE:
    case FETCH_GUIDE_BY_DATE_FAILURE:
      return { ...state, isFetching: false, isError: true }

    // Success
    case FETCH_GUIDE_TODAY_SUCCESS:
      return {
        ...state,
        guideData: { ...action.data },
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
    case FETCH_GUIDE_BY_DATE_SUCCESS:
      return {
        ...state,
        guideData: action.data,
        isFetching: false,
        isError: false,
      }

    // Setters
    case SET_GUIDE_DATE:
      return {
        ...state,
        guideDate: action.data.date,
        isFetching: false,
        isError: false,
      }

    default:
      return state
  }
}

export default guideReducer
