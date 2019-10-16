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
  SET_GUIDE_DATE
} from '../actions';

const initialState = {
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

  isFetching: false,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GUIDE_TODAY:
      return { ...state, isFetching: true, isError: false };
    case FETCH_GUIDE_TODAY_SUCCESS:
      return {
        ...state,
        guideToday: { ...action.data },
        guideByDate: { ...action.data },
        isFetching: false,
        isError: false
      };
    case FETCH_GUIDE_TODAY_FAILURE:
      return { ...state, isFetching: false, isError: true };
    case FETCH_GUIDE_BY_MONTH:
      return { ...state, isFetching: true, isError: false };
    case FETCH_GUIDE_BY_MONTH_SUCCESS:
      return {
        ...state,
        guideByMonth: [...action.data],
        isFetching: false,
        isError: false
      };
    case FETCH_GUIDE_BY_MONTH_FAILURE:
      return { ...state, isFetching: false, isError: false };
    case FETCH_GUIDE_BY_DATE:
      return { ...state, isFetching: true, isError: false };
    case FETCH_GUIDE_BY_DATE_SUCCESS:
      return {
        ...state,
        guideByDate: { ...action.data },
        isFetching: false,
        isError: false
      };
    case FETCH_GUIDE_BY_DATE_FAILURE:
      return { ...state, isFetching: false, isError: true };
    case SET_GUIDE_DATE:
      return {
        ...state,
        guideDate: action.date
      };

    default:
      return state;
  }
};
