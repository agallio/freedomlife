import {
  FETCH_GUIDE_TODAY,
  FETCH_GUIDE_TODAY_SUCCESS,
  FETCH_GUIDE_TODAY_FAILURE,
  FETCH_GUIDE_BY_MONTH,
  FETCH_GUIDE_BY_MONTH_SUCCESS,
  FETCH_GUIDE_BY_MONTH_FAILURE,
  FETCH_GUIDE_BY_DATE,
  FETCH_GUIDE_BY_DATE_SUCCESS,
  FETCH_GUIDE_BY_DATE_FAILURE,
  SET_GUIDE_DATE,
  // 2020
  FETCH_GUIDE2020_TODAY,
  FETCH_GUIDE2020_TODAY_SUCCESS,
  FETCH_GUIDE2020_TODAY_FAILURE,
  FETCH_GUIDE2020_BY_MONTH,
  FETCH_GUIDE2020_BY_MONTH_SUCCESS,
  FETCH_GUIDE2020_BY_MONTH_FAILURE,
  FETCH_GUIDE2020_BY_DATE,
  FETCH_GUIDE2020_BY_DATE_SUCCESS,
  FETCH_GUIDE2020_BY_DATE_FAILURE
} from '../actions';

const initialState = {
  new_2020: true,

  guideToday: {
    date: '',
    pl_name: '',
    pb1_name: '',
    pb2_name: ''
  },
  guideByDate: {
    date: '',
    pl_name: '',
    pb1_name: '',
    pb2_name: ''
  },
  guideByMonth: [],
  guideDate: '',

  // 2020
  guide2020Today: {
    date: '',
    pl_name: '',
    pb_name: ''
  },
  guide2020ByDate: {
    date: '',
    pl_name: '',
    pb_name: ''
  },
  guide2020ByMonth: [],

  isFetching: false,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Fetching
    case FETCH_GUIDE_TODAY:
    case FETCH_GUIDE_BY_MONTH:
    case FETCH_GUIDE_BY_DATE:
    case FETCH_GUIDE2020_TODAY:
    case FETCH_GUIDE2020_BY_MONTH:
    case FETCH_GUIDE2020_BY_DATE:
      return { ...state, isFetching: true, isError: false };

    // Failure
    case FETCH_GUIDE_BY_MONTH_FAILURE:
    case FETCH_GUIDE_TODAY_FAILURE:
    case FETCH_GUIDE_BY_DATE_FAILURE:
    case FETCH_GUIDE2020_TODAY_FAILURE:
    case FETCH_GUIDE2020_BY_MONTH_FAILURE:
    case FETCH_GUIDE2020_BY_DATE_FAILURE:
      return { ...state, isFetching: false, isError: true };

    // Success
    case FETCH_GUIDE_TODAY_SUCCESS:
      return {
        ...state,
        guideToday: { ...action.data },
        guideByDate: { ...action.data },
        isFetching: false,
        isError: false
      };
    case FETCH_GUIDE_BY_MONTH_SUCCESS:
      return {
        ...state,
        guideByMonth: [...action.data],
        isFetching: false,
        isError: false
      };
    case FETCH_GUIDE_BY_DATE_SUCCESS:
      return {
        ...state,
        guideByDate: { ...action.data },
        isFetching: false,
        isError: false
      };
    case SET_GUIDE_DATE:
      return {
        ...state,
        guideDate: action.date
      };

    // 2020
    case FETCH_GUIDE2020_TODAY_SUCCESS:
      return {
        ...state,
        guide2020Today: { ...action.data },
        isFetching: false,
        isError: false
      };
    case FETCH_GUIDE2020_BY_MONTH_SUCCESS:
      return {
        ...state,
        guide2020ByMonth: [...action.data],
        isFetching: false,
        isError: false
      };
    case FETCH_GUIDE2020_BY_DATE_SUCCESS:
      return {
        ...state,
        guide2020ByDate: { ...action.data },
        isFetching: false,
        isError: false
      };

    default:
      return state;
  }
};
